import 'dotenv/config';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import rateLimit from 'express-rate-limit';
import ms from 'ms';
import { error } from './middlewares/error';

export class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.app.use(routes);
        this.app.use(error);
    }

    middlewares(): void {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(
            rateLimit({
                windowMs: ms('1m'),
                max: 250, // limit each IP to 250 requests per windowMs
            }),
        );
    }

    listen(callback: (port: number) => void): void {
        const port = Number(process.env.NODE_PORT) || 3000;
        this.app.listen(port, () => callback(port));
    }
}
