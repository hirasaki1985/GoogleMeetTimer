export class VoiceVoxClient {
  private baseUrl: string = ''
  private baseSpeakerId: number = 0

  /**
   * constructor
   */
  constructor(baseUrl: string, baseSpeakerId: number) {
    this.baseUrl = baseUrl
    this.baseSpeakerId = baseSpeakerId
  }

  /**
   * audioQuery
   */
  public audioQuery = async (speechText: string, speakerId = this.baseSpeakerId): Promise<any> => {
    const url = `${this.baseUrl}/audio_query?text=${encodeURIComponent(speechText)}&speaker=${speakerId}`

    console.log('VoiceVoxClient audioQuery()', url)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`audio_query failed: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * synthesis
   */
  public synthesis = async (
    query: object,
    speakerId = this.baseSpeakerId,
  ): Promise<ArrayBuffer> => {
    const url = `${this.baseUrl}/synthesis?speaker=${speakerId}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })

    if (!response.ok) {
      throw new Error(`synthesis failed: ${response.statusText}`)
    }

    return response.arrayBuffer()
  }
}
