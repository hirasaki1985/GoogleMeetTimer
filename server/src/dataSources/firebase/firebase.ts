import { Storage } from '@google-cloud/storage'
import dotenv from 'dotenv'
import admin from 'firebase-admin'
import { dotEnvFirebaseStorage } from '../env/DotEnv'

// .env を読み込む
dotenv.config()

// 環境変数から認証情報ファイルを設定
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

if (!credentialsPath) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS が設定されていません')
}

/**
 * firebase storage
 */
export const firebaseStorage = new Storage({
  keyFilename: credentialsPath,
})

/**
 * firebase admin
 */
export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(credentialsPath),
  databaseURL: dotEnvFirebaseStorage().databaseUrl,
})

export const firebaseDataBase = firebaseAdmin.database(dotEnvFirebaseStorage().databaseUrl)
