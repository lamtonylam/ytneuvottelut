import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "data.sqlite");

const db = new Database(dbPath, { readonly: true });

export default db;
