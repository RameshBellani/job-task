//worker.js

const { Worker, Queue } = require('bullmq');
const IORedis = require('ioredis');

// Replace 'taskQueue' with the actual name of your queue
const queueName = 'taskQueue';

// Replace 'redis://127.0.0.1:6379' with your Redis server connection details
const connection = new IORedis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null, // Set this to null
});

const worker = new Worker(queueName, async (job) => {
  try {
    console.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);
    
    // Simulate asynchronous task with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`Job ${job.id} completed`);
  } catch (error) {
    console.error(`Error processing job ${job.id}: ${error.message}`);
    throw error;
  }
}, {
  limiter: {
    max: 10,
    duration: 1000,
  },
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
  connection, // Provide the Redis connection
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, error) => {
  console.error(`Job ${job.id} failed: ${error.message}`);
});

console.log(`Worker started for queue: ${queueName}`);
