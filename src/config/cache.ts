import { RedisOptions } from 'ioredis';

interface ICacheConfig {
    config: {
        redis: RedisOptions
    }
    driver: string;
}

export default {
    config: {
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDID_PORT,
            password: process.env.REDIS_PASS || undefined
        }
    },
    driver: 'redis',
} as ICacheConfig;