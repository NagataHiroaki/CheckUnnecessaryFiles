/**
 * Check Unnecessary Files
 *
 * ■使い方
 *
 * 1.Website Explorerでサイトを読み込み「サイト内リソース」のタブをEXELに出力。
 * 2.「アドレス」の列をコピーして_compareSource.txtに張り付ける。
 * 3.cuf.jsファイルを開きrootPathをサイトの構成に合わせて変更する。
 * 4.CLIでcuf.jsファイルのある階層に移動し、`node cuf.js`と実行する。
 */
// すべてのファイルアイテム列挙のソース元
// https://qiita.com/standard-software/items/e37bfd1db0f5ada192cf

'use strict';
const fs = require('fs');
const path = require('path');
const rootPath = 'public';
const regex = new RegExp(/\.(jpg|png|svg|gif)$/);

const readSubDirSync = folderPath => {
  let result = [];
  const _folderPath = process.cwd() + '\\' + rootPath;

  const readTopDirSync = folderPath => {
    let items = fs.readdirSync(folderPath);
    items = items.map(itemName => {
      return path.join(folderPath, itemName);
    });
    items.forEach(itemPath => {
      if (fs.statSync(itemPath).isDirectory()) {
        readTopDirSync(itemPath);
        //再帰処理
      } else {
        // 画像ファイルのみを格納
        if (regex.test(itemPath)) {
          itemPath = itemPath.replace(_folderPath, '');
          itemPath = itemPath.replace(/\\/g, '/');
          result.push(itemPath);
        }
      }
    });
  };
  readTopDirSync(folderPath);
  return result;
};

let folderPath = process.cwd();
folderPath = path.resolve(folderPath, './' + rootPath);

const compareSource = fs.readFileSync('_compareSource.txt', 'utf8');

// //サブディレクトリの列挙
var items = readSubDirSync(folderPath);
console.log('---- ▽▽リンク切れ画像の一覧▽▽ ----');
items.forEach(itemPath => {
  if (compareSource.indexOf(itemPath) === -1) {
    console.log(itemPath);
  }
});
console.log('---- △△リンク切れ画像の一覧△△ ----');
