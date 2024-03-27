// app.js
const yargs = require('yargs');
const fitnessController = require('./fitness.js');

// Create add activity command
yargs.command({
  command: 'add',
  describe: 'Add a new fitness activity',
  builder: {
    type: {
      describe: 'Type of activity (e.g., Running, Cycling)',
      demandOption: true,
      type: 'string',
    },
    duration: {
      describe: 'Duration in minutes',
      demandOption: true,
      type: 'number',
    },
    date: {
      describe: 'Date of activity (format YYYY-MM-DD)',
      demandOption: true,
      type: 'string',
    },
    intensity: {
      describe: 'Intensity of activity (e.g., Low, Medium, High)',
      demandOption: true,
      type: 'string',
    },
    calories: {
      describe: 'Calories burned during activity',
      demandOption: true,
      type: 'number',
    }
  },
  handler(argv) {
    fitnessController.addActivity(argv.type, argv.duration, argv.date, argv.intensity, argv.calories);
  }
});

// Create remove activity command
yargs.command({
  command: 'remove',
  describe: 'Remove a fitness activity',
  builder: {
    date: {
      describe: 'Date of activity to remove (format YYYY-MM-DD)',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    fitnessController.removeActivity(argv.date);
  }
});

// Create list activities command
yargs.command({
  command: 'list',
  describe: 'List all fitness activities',
  handler() {
    fitnessController.listActivities();
  }
});

// Create read activity command
yargs.command({
  command: 'read',
  describe: 'Read details of a fitness activity',
  builder: {
    date: {
      describe: 'Date of activity to read (format YYYY-MM-DD)',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    fitnessController.readActivity(argv.date);
  }
});

yargs.parse();