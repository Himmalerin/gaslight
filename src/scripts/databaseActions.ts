import {Statement} from "better-sqlite3";
import {db} from "../databaseInit";

export const addUser: Function = (): Statement => db.prepare(`
    INSERT INTO User (id)
    VALUES ($id)
`);

export const getUserById: Function = (): Statement => db.prepare(`
    SELECT *
    FROM User
    WHERE id = ?
`);

export const addReminder: Function = (): Statement => db.prepare(`
    INSERT INTO Reminder (id, due_at, message, owner_id, channel_id, is_private, created_at)
    VALUES ($id, $due_at, $message, $owner_id, $channel_id, $is_private, $created_at)
`);

export const getReminders: Function = (): Statement => db.prepare(`
    SELECT *
    FROM Reminder
    ORDER BY id
`);

export const getReminderById: Function = (): Statement => db.prepare(`
    SELECT *
    FROM Reminder
    WHERE id = ?
`);

export const getReminderByOwnerId: Function = (): Statement => db.prepare(`
    SELECT *
    FROM Reminder
    WHERE owner_id = ?
`);

export const removeReminder: Function = (): Statement => db.prepare(`
    DELETE
    FROM Reminder
    WHERE id = ?
`);
