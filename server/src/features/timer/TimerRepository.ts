import { FirebaseRealTimeDatabaseRepository } from '../../dataSources/firebase/realTimeDatabase/FirebaseRealTimeDatabaseRepository'
import { Database } from 'firebase-admin/lib/database'
import { VoiceManagerTextIds } from '../VoiceManager/VoiceManagerConst'
import {
  googleMeetSettingGetDBMeetingPath,
  googleMeetSettingGetDBVoiceMp3FilePath,
} from './GoogleMeetSettingHelper'

export class TimerRepository {
  private firebaseRealTimeDatabaseRepository: FirebaseRealTimeDatabaseRepository

  constructor(admin: Database) {
    this.firebaseRealTimeDatabaseRepository = new FirebaseRealTimeDatabaseRepository(admin)
  }

  /**
   * mp3ファイルのパスを更新する
   * @param meetingId
   * @param textId
   * @param url
   */
  public updateMp3FilePath = async (
    meetingId: string,
    textId: VoiceManagerTextIds,
    url: string,
  ): Promise<boolean> => {
    const path = `${googleMeetSettingGetDBVoiceMp3FilePath(meetingId, textId)}`
    console.log('TimerRepository updateMp3FilePath() path', path)
    await this.firebaseRealTimeDatabaseRepository.update(path, {
      url,
      updatedAt: new Date().toISOString(),
    })
    return true
  }
}
