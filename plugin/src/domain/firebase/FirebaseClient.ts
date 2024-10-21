import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getEnvFirebase } from '@/utils/DotEnv';

const firebaseConfig = getEnvFirebase();
console.log('FirebaseClient firebaseConfig', firebaseConfig);

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Realtime Databaseのインスタンス取得
export const firebaseDataBase = getDatabase(app);
