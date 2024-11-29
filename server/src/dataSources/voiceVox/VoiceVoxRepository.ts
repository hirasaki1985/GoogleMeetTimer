import { VoiceVoxClient } from './voiceVoxClient'

export class VoiceVoxRepository {
  private voiceVoxClient: VoiceVoxClient

  constructor(voiceVoxClient: VoiceVoxClient) {
    this.voiceVoxClient = voiceVoxClient
  }

  /**
   * VoiceVoxでテキストを合成して音声データを取得する
   */
  public async generateVoice(text: string): Promise<ArrayBuffer> {
    console.log('VoiceVoxRepository generateVoice()', text)
    try {
      const query = await this.voiceVoxClient.audioQuery(text)
      console.log('VoiceVoxRepository generateVoice() query', query)
      return await this.voiceVoxClient.synthesis(query)
    } catch (error) {
      console.error('Error generating voice:', error)
      throw error
    }
  }
}
