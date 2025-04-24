import {GraphQLServer} from "graphql-yoga";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from './schema'
import dotenv from 'dotenv';

dotenv.config();    


class App {
    public app: GraphQLServer;
    constructor(){
        this.app = new GraphQLServer({
            schema : schema
        });
        this.middlewares();
    }
    private middlewares = (): void => {
        this.app.express.use(cors({
            origin: true, 
            credentials: true,
        }))
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet({
            contentSecurityPolicy: {
              directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
                styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "fonts.googleapis.com"],
                imgSrc: ["'self'", "data:", "cdn.jsdelivr.net"],
                connectSrc: ["'self'", "http://localhost:3000/graphql"], // Match your GraphQL endpoint
                fontSrc: ["'self'", "fonts.gstatic.com"],
                objectSrc: ["'none'"]
              },
            },
            crossOriginEmbedderPolicy: false // For Playground iframe
          }));
    }
}

export default new App().app;
