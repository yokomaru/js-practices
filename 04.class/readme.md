# 初回実行
以下コマンドを実行してください

1. リポジトリをクローン

```shell
git clone https://github.com/yokomaru/js-practices.git
```

2. ディレクトリとブランチを変更

```shell
cd 04.class
git checkout my-class
```

3. npmをインストール

```shell
npm install
```

4. `init.js`を実行し、メモテーブルを作成する
```shell
./init.js
```

# メモアプリの操作
## メモの作成
以下コマンドを実行してください
```js
./index.js
// または
echo "作成したい内容" | ./index.js
```

- `./index.js`で実行する場合は、その後メモの内容を入力してください。
- 入力後がはEOFを入力(Macの場合Ctrl + d)を入力してください
- パイプで実行する場合は記入した内容がそのまま表示されます。

## メモの一覧表示
```js
./index.js -l
```
## メモの詳細表示
```js
./index.js -r
```
## メモの削除
```js
./index.js -d
```
