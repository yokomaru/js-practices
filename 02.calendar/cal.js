#!/usr/bin/env node

import minimist from "minimist";
import chalk from "chalk";

const validateMonth = (argvMonth) => {
  if (typeof argvMonth === "undefined") {
    return true;
  }

  if (typeof argvMonth === "boolean") {
    console.error("cal: option requires an argument -- m");
    return false;
  }

  if (typeof argvMonth !== "number" || argvMonth < 1 || 12 < argvMonth) {
    console.error(`cal: month \`${argvMonth}' not in range 1..12`);
    return false;
  }

  return true;
};

const validateYear = (argvYear) => {
  if (typeof argvYear === "undefined") {
    return true;
  }

  if (typeof argvYear === "boolean") {
    console.error("cal: option requires an argument -- y");
    return false;
  }

  if (typeof argvYear !== "number" || argvYear < 1970 || 2100 < argvYear) {
    console.error(`cal: year \`${argvYear}' not in range 1970..2100`);
    return false;
  }

  return true;
};

const printCalender = (year, month, today) => {
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  const monthFirstDate = new Date(year, month - 1, 1);
  process.stdout.write("   ".repeat(monthFirstDate.getDay()));

  const monthLastDate = new Date(year, month, 0);

  for (
    let date = new Date(monthFirstDate);
    date <= monthLastDate;
    date.setDate(date.getDate() + 1)
  ) {
    const paddedDay = date.getDate().toString().padStart(2, " ");
    const displayedDay =
      date.toDateString() === today.toDateString()
        ? chalk.bgWhite(paddedDay)
        : paddedDay;

    process.stdout.write(
      `${displayedDay}${isSaturdayOrMonthLastDate(date, monthLastDate) ? "\n" : " "}`,
    );
  }
};

const isSaturdayOrMonthLastDate = (date, monthLastDate) => {
  return (
    date.getDay() === 6 || date.toDateString() === monthLastDate.toDateString()
  );
};

const argv = minimist(process.argv.slice(2));

if (!validateMonth(argv.m) || !validateYear(argv.y)) {
  process.exit(1);
}

const today = new Date();
const month = argv.m ?? today.getMonth() + 1;
const year = argv.y ?? today.getFullYear();
printCalender(year, month, today);
