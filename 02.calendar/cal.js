#!/usr/bin/env node

import minimist from "minimist";
import chalk from "chalk";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayString = today.toLocaleDateString("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const year =
  typeof argv["y"] !== "undefined" && 1970 <= argv["y"] && argv["y"] <= 2100
    ? argv["y"]
    : todayYear;
const month =
  typeof argv["m"] !== "undefined" && 1 <= argv["m"] && argv["m"] <= 12
    ? argv["m"]
    : todayMonth;

const lastMonthDate = new Date(year, month, 1);

const firstMonthDate = new Date(year, month - 1, 1);
const firstMonthDay = new Date(firstMonthDate).getDay();

const calenderTitle = `${month}月 ${year}`;
const calenderTitleLength = calenderTitle.length;

console.log(
  `${calenderTitle
    .padStart(
      calenderTitleLength + Math.floor((20 - calenderTitleLength) / 2),
      " ",
    )
    .padEnd(20, " ")}  `,
);
console.log("日 月 火 水 木 金 土  ");

for (let i = 0; i < firstMonthDay; i++) {
  process.stdout.write("   ");
}

for (
  let date = firstMonthDate;
  date < lastMonthDate;
  date.setDate(date.getDate() + 1)
) {
  const dateString = date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const paddedDate = `${date.getDate()}`.padStart(2, " ");
  const displayDate =
    todayString === dateString ? chalk.bgWhite(paddedDate) : paddedDate;

  if (date.getDay() === 6) {
    console.log(`${displayDate}`);
  } else {
    process.stdout.write(displayDate);
    process.stdout.write(" ");
  }
}

console.log("\n");
