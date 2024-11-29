import { Storage } from '@google-cloud/storage'
import dotenv from 'dotenv'

// .env を読み込む
dotenv.config()

// 環境変数から認証情報ファイルを設定
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

if (!credentialsPath) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS が設定されていません')
}

export const firebaseStorage = new Storage({
  keyFilename: credentialsPath,
})
