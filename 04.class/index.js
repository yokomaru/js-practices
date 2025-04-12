import minimist from "minimist";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

import { App } from "./lib/app.js";
import { Option } from "./lib/option.js";
import { Command } from "./lib/command.js";
import { MemoControl } from "./lib/memo-control.js";
import { DatabaseOperation } from "./lib/database-operation.js";

const databaseOperation = new DatabaseOperation(db);
const memoControl = new MemoControl(databaseOperation);
const command = new Command(memoControl);
const argv = minimist(process.argv.slice(2));
const isTTY = process.stdin.isTTY;
const option = new Option(argv, isTTY);

App.main(option, command);
