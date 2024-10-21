import { ref, onValue, Database } from 'firebase/database';

export class FirebaseDBRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }
}
