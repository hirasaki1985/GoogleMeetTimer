import { Database } from 'firebase-admin/lib/database'

/**
 * firebase: Realtime Database
 */
export class FirebaseRealTimeDatabaseRepository {
  private readonly database: Database

  /**
   * constructor
   */
  constructor(admin: Database) {
    this.database = admin
  }

  async get<T>(path: string): Promise<T | null> {
    const snapshot = await this.database.ref(path).once('value')
    return snapshot.val()
  }

  /**
   * 指定されたパスのデータを完全に置き換える（新しいデータで上書きする
   */
  async set<T>(path: string, value: T): Promise<void> {
    await this.database.ref(path).set(value)
  }

  /**
   * 指定されたパスのデータを部分的に更新する
   */
  async update<T>(path: string, value: Partial<T>): Promise<void> {
    await this.database.ref(path).update(value)
  }

  async remove(path: string): Promise<void> {
    await this.database.ref(path).remove()
  }
}
