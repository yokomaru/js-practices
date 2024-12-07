#!/usr/bin/env node

import minimist from "minimist";
import chalk from "chalk";

function validateMonth(argvMonth) {
  if (typeof argvMonth === "boolean") {
    console.error("cal: option requires an argument -- m");
    process.exit(1);
  }

  if (typeof argvMonth !== "number" || argvMonth < 1 || 12 < argvMonth) {
    console.error(`cal: month \`${argvMonth}' not in range 1..12`);
    process.exit(1);
  }
}

function validateYear(argvYear) {
  if (typeof argvYear === "boolean") {
    console.error("cal: option requires an argument -- y");
    process.exit(1);
  }

  if (typeof argvYear !== "number" || argvYear < 1970 || 2100 < argvYear) {
    console.error(`cal: year \`${argvYear}' not in range 1970..2100`);
    process.exit(1);
  }
}

function printCalender(year, month, today) {
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  const monthFirstDay = new Date(year, month - 1, 1);

  for (let i = 0; i < monthFirstDay.getDay(); i++) {
    process.stdout.write("   ");
  }

  const monthLastDate = new Date(year, month, 0).getDate();

  for (let date = 1; date <= monthLastDate; date++) {
    const calenderDate = new Date(year, month - 1, date);
    const paddedDate = date.toString().padStart(2, " ");
    const displayDate =
      today.toDateString() === calenderDate.toDateString()
        ? chalk.bgWhite(paddedDate)
        : paddedDate;

    if (calenderDate.getDay() === 6) {
      console.log(displayDate);
      continue;
    }

    process.stdout.write(displayDate);
    process.stdout.write(date === monthLastDate ? "\n" : " ");
  }
}

const argv = minimist(process.argv.slice(2));
const today = new Date();
const month = argv.m ?? today.getMonth() + 1;
const year = argv.m ?? today.getFullYear();

validateMonth(month);
validateYear(year);
printCalender(year, month, today);
