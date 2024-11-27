#!/usr/bin/env node

import minimist from "minimist";
import chalk from "chalk";

function init() {
  const argv = minimist(process.argv.slice(2));
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;

  if (typeof argv.y === "boolean") {
    return console.error("cal: option requires an argument -- y");
  }

  if (typeof argv.m === "boolean") {
    return console.error("cal: option requires an argument -- m");
  }

  if (typeof argv.y !== "undefined") {
    if (typeof argv.y === "number" && 1970 <= argv.y && argv.y <= 2100) {
      year = argv.y;
    } else {
      return console.error(`cal: year \`${argv.y}' not in range 1970..2100`);
    }
  }

  if (typeof argv.m !== "undefined") {
    if (typeof argv.m === "number" && 1 <= argv.m && argv.m <= 12) {
      month = argv.m;
    } else {
      return console.error(
        `cal: ${argv.m} is neither a month number (1..12) nor a name`,
      );
    }
  }

  buildCalender(year, month, today);
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

  for (let i = 0; i < monthFirstDate.getDay(); i++) {
    process.stdout.write("   ");
  }

  for (
    let date = monthFirstDate;
    date < new Date(year, month, 1, 0);
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

init();
