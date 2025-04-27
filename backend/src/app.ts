import cors from "cors";
import {NextFunction,Response} from 'express'
import {GraphQLServer, PubSub} from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from './schema'
import dotenv from 'dotenv';
import decodeJWT from "./utils/decodeJWT";


dotenv.config();    


class App {
    public app: GraphQLServer;
    public pubSub: any;
    constructor(){
      this.pubSub = new PubSub();
      this.pubSub.ee.setMaxListeners(99);
        this.app = new GraphQLServer({
            schema: schema,
            context:req => {
              const {connection: {context =null} ={}} = req;
              return {
                req: req.request,
                pubSub: this.pubSub,
                context
              }
            }
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

          this.app.express.use(this.jwt)
    }

    private jwt = async (
      req,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const token = req.get("X-JWT");
      if(token){
        const user = await decodeJWT(token);
        if(user){
          req.user = user;
        } else {
          req.user = undefined;
        }
      }
      next();
    }
}

export default new App().app;
