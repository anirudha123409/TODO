const week = {
  weekday: ["mon", "tue", "Wed", "thur", "fri"],
  weekend: {
    sat: "busy",
    sun: "free",
  },
};

console.log(week.weekend);
console.log(week.weekday[2]);
console.log(week.weekend.sun);
