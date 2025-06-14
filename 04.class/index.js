#!/usr/bin/env node

import minimist from "minimist";
import Enquirer from "enquirer";
import readline from "readline";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

import { App } from "./lib/app.js";
import { Command } from "./lib/command.js";
import { DatabaseOperation } from "./lib/database-operation.js";
import { MemoControl } from "./lib/memo-control.js";
import { UserInput } from "./lib/user-input.js";

const databaseOperation = new DatabaseOperation(db);
const memoControl = new MemoControl(databaseOperation);
const argv = minimist(process.argv.slice(2));
const isTTY = process.stdin.isTTY;
const userInput = new UserInput(argv, isTTY, readline, Enquirer);
const command = new Command(memoControl, userInput);

App.main(command);
