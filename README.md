# CheckUnnecessaryFiles
参照のない、不要な画像のリストを抽出する

# 使い方

1. Website Explorerでサイトを読み込み「サイト内リソース」のタブをEXELに出力。
2. 「アドレス」の列をコピーして_compareSource.txtに張り付ける。
3. cuf.jsファイルを開きrootPathをサイトの構成に合わせて変更する。
4. CLIでcuf.jsファイルのある階層に移動し、`node cuf.js`と実行する。
