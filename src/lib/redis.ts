import Redis from 'ioredis';
const { REDIS_URL} = process.env

const redis = new Redis(REDIS_URL as string);  // Set REDIS_URL in environment variables

export default redis;
