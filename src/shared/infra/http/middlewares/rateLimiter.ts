import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASS
        });

        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: 'ratelimit',
            points: 5,  //Quantidade de requisições pelo mesmo ip
            duration: 1 // Em 1 segundo
        });
        
        await limiter.consume(req.ip);
        return next();
    } catch (error) {
        throw new AppError('Too many requests', 429);
    }
}

export default rateLimiter;