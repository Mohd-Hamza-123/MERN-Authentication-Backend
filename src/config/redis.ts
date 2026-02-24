import env from './env.js';
import { createClient } from 'redis';

export const redisClient = createClient({
    username: 'default',
    password:env.REDIS_PASSWORD ,
    socket: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
    }
});

const connectRedis = async () => {
    try {
        await redisClient.connect()
        console.log('Redis Client Connected')
    } catch (error : unknown) {

        let errorMessage = error instanceof Error ? error.message : error
        console.error("Error connecting to redis : ", errorMessage)
        process.exit(1)

    }
}

export default connectRedis
