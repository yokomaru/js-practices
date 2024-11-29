#!/usr/bin/env node

import minimist from "minimist";
import chalk from "chalk";

function parseArguments(argv) {
  validateMonth(argv.m);
  validateYear(argv.y);

  return [argv.m, argv.y];
}

function validateMonth(argvMonth) {
  if (typeof argvMonth === "undefined") {
    return;
  }

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
  if (typeof argvYear === "undefined") {
    return;
  }

  if (typeof argvYear === "boolean") {
    console.error("cal: option requires an argument -- y");
    process.exit(1);
  }

  if (typeof argvYear !== "number" || argvYear < 1970 || 2100 < argvYear) {
    console.error(`cal: year \`${argvYear}' not in range 1970..2100`);
    process.exit(1);
  }
}

function setMonth(currentDate, argvMonth) {
  return typeof argvMonth === "undefined"
    ? currentDate.getMonth() + 1
    : argvMonth;
}

function setYear(currentDate, argvYear) {
  return typeof argvYear === "undefined" ? currentDate.getFullYear() : argvYear;
}

function buildCalender(year, month, today) {
  const calenderTitle = `${month}月 ${year}`;
  const calenderTitleLength = calenderTitle.length;

  console.log(
    `${calenderTitle
      .padStart(
        calenderTitleLength + Math.floor((20 - calenderTitleLength) / 2),
        " ",
      )
      .padEnd(20, " ")}`,
  );

  console.log("日 月 火 水 木 金 土");

  const monthFirstDate = new Date(year, month - 1, 1);
  const monthFirstDay = monthFirstDate.getDay();

  for (let i = 0; i < monthFirstDay; i++) {
    process.stdout.write("   ");
  }

  const monthLastDate = new Date(year, month, 0);

  for (
    let date = monthFirstDate;
    date <= monthLastDate;
    date.setDate(date.getDate() + 1)
  ) {
    const calenderDate = date.getDate().toString();
    const displayDate =
      today.toDateString() === date.toDateString()
        ? chalk.bgWhite(calenderDate.padStart(2, " "))
        : calenderDate.padStart(2, " ");

    if (date.getDay() === 6) {
      console.log(displayDate);
    } else {
      process.stdout.write(displayDate);
      process.stdout.write(" ");
    }
  }

  console.log();
}

const argv = minimist(process.argv.slice(2));
const [argvMonth, argvYear] = parseArguments(argv);
const currentDate = new Date();
const month = setMonth(currentDate, argvMonth);
const year = setYear(currentDate, argvYear);

buildCalender(year, month, currentDate);
