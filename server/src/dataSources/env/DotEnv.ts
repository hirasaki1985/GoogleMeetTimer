import { VoiceManagerSpeakerIds } from '../../features/VoiceManager/VoiceManagerConst'

export const dotEnvFirebaseStorage = () => ({
  bucketName: process.env.FIREBASE_STORAGE_BUCKET_NAME as string,
  databaseUrl: process.env.FIREBASE_DATABASE_URL as string,
})

export const dotEnvVoiceVox = () => ({
  apiUrl: process.env.VOICE_VOX_API_URL as string,
  speakerId: Number(process.env.VOICE_VOX_BASE_SPEAKER_ID as string) as VoiceManagerSpeakerIds,
})

export const dotEnvServer = () => ({
  port: Number(process.env.PORT as string),
})
