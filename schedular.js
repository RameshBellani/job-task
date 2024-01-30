//schedular.js

const  Queue  = require('bull');

// Replace 'taskQueue' with the actual name of your queue
const queueName = 'taskQueue';

const taskQueue =  Queue(queueName);

async function scheduleTask(name, data, delay) {
  try {
    const jobData = {
      name,
      data,
    };

    await taskQueue.add(jobData, {
      delay: delay || 0,
    });

    console.log(`Task scheduled: ${name}`);
  } catch (error) {
    console.error(`Error scheduling task: ${error.message}`);
    throw error;
  }
}

module.exports = {
  scheduleTask,
};
