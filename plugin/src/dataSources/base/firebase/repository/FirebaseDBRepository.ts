import { ref, set, remove, Database, push, ThenableReference, update } from 'firebase/database'

export class FirebaseDBRepository {
  private db: Database

  constructor(db: Database) {
    this.db = db
  }

  /**
   * DBに情報を書き込む。
   * pathにある情報は完全に上書きされる。
   */
  public async write(path: string, data: object | number | string | boolean): Promise<void> {
    console.log('FirebaseDBRepository write() ', {
      path,
      data,
    })
    return await set(ref(this.db, path), data)
  }

  /**
   * DBの情報を部分更新する。
   * 指定したフィールドだけ上書きし、他のフィールドには影響を与えない。
   */
  public async update(path: string, data: object): Promise<void> {
    return await update(ref(this.db, path), data)
  }

  /**
   * DBに情報を追加する
   */
  public push(path: string, data: object | number | string | boolean): ThenableReference {
    return push(ref(this.db, path), data)
  }

  /**
   * DBの情報を削除する
   */
  public async remove(path: string): Promise<void> {
    return await remove(ref(this.db, path))
  }
}
