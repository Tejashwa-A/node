// fitness.js
const fs = require("fs");
const chalk = require("chalk");

const loadActivities = () => {
  try {
    const dataBuffer = fs.readFileSync("activities.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveActivities = (activities) => {
  const dataJSON = JSON.stringify(activities, null, 2);
  fs.writeFileSync("activities.json", dataJSON);
};

const addActivity = (type, duration, date, intensity, calories) => {
  const activities = loadActivities();
  const duplicate = activities.find((activity) => activity.date === date);

  if (!duplicate) {
    activities.push({ type, duration, date, intensity, calories });
    saveActivities(activities);
    console.log(chalk.green.inverse("New activity added!"));
  } else {
    console.log(chalk.red.inverse("Activity for this date already exists!"));
  }
};

const removeActivity = (date) => {
  const activities = loadActivities();
  const activitiesToKeep = activities.filter(
    (activity) => activity.date !== date
  );

  if (activities.length > activitiesToKeep.length) {
    saveActivities(activitiesToKeep);
    console.log(chalk.green.inverse("Activity removed!"));
  } else {
    console.log(chalk.red.inverse("No activity found on this date!"));
  }
};

const listActivities = () => {
  const activities = loadActivities();
  console.log(chalk.inverse("Your fitness activities:"));
  activities.forEach((activity) => {
    console.log(
      `Date: ${activity.date}`
    );
  });
};

const readActivity = (date) => {
  const activities = loadActivities();
  const activity = activities.find((activity) => activity.date === date);

  if (activity) {
    console.log(
      chalk.inverse(
        `Date: ${activity.date}, Type: ${activity.type}, Duration: ${activity.duration} minutes`
      )
    );
  } else {
    console.log(chalk.red.inverse("No activity found on this date!"));
  }
};

module.exports = {
  addActivity,
  removeActivity,
  listActivities,
  readActivity,
};
