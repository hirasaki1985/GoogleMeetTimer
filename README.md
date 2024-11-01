# GoogleMeetTimer
## バージョン
```
$ node -v
v20.10.0
$ pnpm -v
9.12.3

```

## 環境構築
### add hosts file

```
$ vi /etc/hosts
```

```
127.0.0.1 google-meet-timer.dev.to
```

### cert
```
$ mkdir cert
$ cd cert
$ openssl req -x509 -out localhost.pem -keyout localhost-key.pem -newkey rsa:2048 -nodes -days 365 -subj "/CN=google-meet-timer.dev.to"
```

### install
```
$ cd plugin
$ pnpm i
```

### 起動
```
$ pnpm dev
```

### アクセス
[https://google-meet-timer.dev.to:5173/nvd-nnrc-ezt?authuser=0](https://google-meet-timer.dev.to:5173/nvd-nnrc-ezt?authuser=0)
)





