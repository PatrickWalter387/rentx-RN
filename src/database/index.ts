import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Database } from '@nozbe/watermelondb';

import { User } from './models/User';
import { schemas } from './schemas';
import { Car } from './models/Car';

const adapter = new SQLiteAdapter({
  schema: schemas
})

export const database = new Database({
    adapter,
    modelClasses: [User, Car]
})