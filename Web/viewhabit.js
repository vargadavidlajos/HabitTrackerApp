document.getElementById("viewhabit-back").addEventListener("click", function () {
    window.location.href = "mainpage.html";
});

function calculateDaysAgo(dateStrings) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const currentDate = new Date(todayStr);

  const msPerDay = 1000 * 60 * 60 * 24;

  return dateStrings.map(str => {
    const dateStr = str.split("-").slice(0, 3).join("-");
    const inputDate = new Date(dateStr);
    const diffInMs = currentDate - inputDate;
    return Math.floor(diffInMs / msPerDay);
  });
}

const timestamps = [
  "2025-09-25-12-00",
  "2025-09-27-08-30",
  "2025-09-20-00-00",
  "2025-09-17-00-00"
];

const daysAgoList = calculateDaysAgo(timestamps);

let streakCount = 0;
for (let i = 1; ; i++) {
  if (daysAgoList.includes(i)) {
    streakCount++;
  } else {
    break;
  }
}
if (streakCount == 0 && daysAgoList.includes(0)) {
  streakCount = 1;
}

const streakElement = document.getElementById("streak-number");
if (streakCount > 0) {
  streakElement.textContent = streakCount + "\u{1F31F}";
}