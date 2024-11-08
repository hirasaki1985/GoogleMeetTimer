# GoogleMeetTimer
## 概要
googleミートの参加者でタイマーを共有する。

![image](https://github.com/user-attachments/assets/127bd4a7-bcef-40c1-bb4f-32374af95d4d)

このタイマーの操作は本プラグインをインストールしている参加者全員で共有される。

## 1. 使い方
### 1-1. firebaseの登録
1. fireabaseのプロジェクトを作成
2. 「Realtime Database」を有効にする
3. 発行されたfirebaseConfigの値を控えておく

### 1-2. ビルド
1. 本リポジトリをgit cloneで取得
2. 下記項目「3. 環境構築」に合わせて.envの値を設定(1-1で取得したfirebaseConfigの値を設定する)
4. 下記項目「5. ビルド」を実行
5. zipディレクトリにzipファイルが作成されているのを確認
6. zipファイルを解凍しておく

#### .envの値について
`VITE_APP_WHITE_LIST`でタイマーを表示するミーティングIDをカンマ区切りで設定できる。
もし`aaa-aaaa-aaa,bbb-bbbb-bbb,ccc*`と設定すれば、`aaa-aaaa-aaa,bbb-bbbb-bbb,頭がccc`のミーティングIDが対象となる。
`VITE_APP_WHITE_LIST=*`とすれば全てのミーティングIDで表示されるようになる。

### 1-3. プラグインの登録
1. Google Chromeの右上のアイコンで「拡張機能を管理」をクリック
   
![image](https://github.com/user-attachments/assets/5244beb4-bd77-45f3-9ef7-6d0eb8f3e9c9)

![image](https://github.com/user-attachments/assets/075a5c36-31c8-49a9-ab0e-42159990b843)

3. デベロッパーモードをONにする。
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. 1-1でビルドしたzipファイルのdistディレクトリを選択
6. 登録されれば最高
   
![image](https://github.com/user-attachments/assets/abf940e5-46a3-4c43-ab1d-fd7205968685)


### 1-4. google meetにアクセス
![image](https://github.com/user-attachments/assets/127bd4a7-bcef-40c1-bb4f-32374af95d4d)

上記のタイマーが表示されていれば成功。

## 2. バージョン
```
$ node -v
v20.10.0
$ pnpm -v
9.12.3

```

## 3. 環境構築
### add hosts file

```
$ vi /etc/hosts
```

```
127.0.0.1 google-meet-timer.dev.to
```

### cert
```
$ cd plugin
$ mkdir cert
$ cd cert
$ openssl req -x509 -out localhost.pem -keyout localhost-key.pem -newkey rsa:2048 -nodes -days 365 -subj "/CN=google-meet-timer.dev.to"
```

### install
```
$ cd plugin
$ pnpm i
```

## 4. 起動
```
$ pnpm dev
```

### アクセス
[https://google-meet-timer.dev.to:5173/nvd-nnrc-ezt?authuser=0](https://google-meet-timer.dev.to:5173/nvd-nnrc-ezt?authuser=0)

## 5. ビルド
```
$ pnpm build
```




