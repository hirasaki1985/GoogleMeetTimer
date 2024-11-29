import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getEnvFirebase } from '@/utils/DotEnv'

const firebaseConfig = getEnvFirebase()
console.log('FirebaseClient firebaseConfig', firebaseConfig)

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

// Realtime Databaseのインスタンス取得
export const firebaseDataBase = getDatabase(app)

// authインスタンス
export const firebaseAuth = getAuth(app)

/**
 * const
 */
export const firebaseGoogleProvider = new GoogleAuthProvider()
