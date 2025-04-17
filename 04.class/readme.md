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

以下どちらかの方法でコマンドを実行してください

```js
./index.js
```

```
echo "作成したい内容" | ./index.js
```

- `./index.js`で実行する場合は、その後メモの内容を入力してください。
- 入力後がはEOFを入力(Macの場合Ctrl + d)を入力してください
- パイプで実行する場合は記入した内容がそのまま表示されます。

### デモ

![画面収録 2025-04-16 0 13 05](https://github.com/user-attachments/assets/c18eb17e-dcb0-4704-8c9e-d157a56c05f7)

![画面収録 2025-04-16 0 14 27](https://github.com/user-attachments/assets/9eb99b4f-0ccb-4798-85c5-a5cfd61412fb)

## メモの一覧表示

```js
./index.js -l
```

- 今まで登録したメモの一覧を表示します
- データがない場合は`No Data`と表示されます

### デモ

![画面収録 2025-04-16 0 25 41](https://github.com/user-attachments/assets/58c38aac-accf-4e03-ae74-2300e20a4e8e)

## メモの詳細表示

```js
./index.js -r
```

- 今まで登録したメモの一覧を表示します
- データがない場合は`No Data`と表示されます
- メモを選択するとメモの内容が表示されます

### デモ

![画面収録 2025-04-16 0 26 02](https://github.com/user-attachments/assets/845e4c20-2cef-43f7-b3b6-6225e02e7f33)

## メモの削除

```js
./index.js -d
```

- 今まで登録したメモの一覧を表示します
- データがない場合は`No Data`と表示されます

### デモ

![画面収録 2025-04-16 0 26 20 (1)](https://github.com/user-attachments/assets/56511c40-4acd-44cd-81a3-418adba60bbc)
