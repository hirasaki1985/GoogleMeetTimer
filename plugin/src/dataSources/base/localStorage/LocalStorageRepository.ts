export class LocalStorageRepository {
  /**
   * set
   */
  public set(key: string, value: string | number | object | boolean): void {
    if (typeof value === 'object') {
      return localStorage.setItem(key, JSON.stringify(value))
    }
    return localStorage.setItem(key, String(value))
  }

  /**
   * get
   */
  public get(key: string): string | null {
    return localStorage.getItem(key)
  }

  /**
   * remove
   */
  public remove(key: string): void {
    return localStorage.removeItem(key)
  }

  /**
   * clear
   */
  public clear(): void {
    return localStorage.clear()
  }
}
