import Database from "better-sqlite3";

const db = new Database("database.sqlite");

const createUserTable = db.prepare(`CREATE TABLE IF NOT EXISTS User(
    id TEXT PRIMARY KEY
)`);

createUserTable.run();

const createReminderTable = db.prepare(`CREATE TABLE IF NOT EXISTS Reminder(
    id TEXT PRIMARY KEY,
    due_at INTEGER NOT NULL,
    message TEXT NOT NULL,
    owner_id TEXT NOT NULL,
    channel_id TEXT,
    is_private INTEGER,
    created_at INTEGER,
    FOREIGN KEY(owner_id) REFERENCES User(id)
)`);

createReminderTable.run();

export {db};
