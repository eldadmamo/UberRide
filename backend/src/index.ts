import { Options } from "graphql-yoga";
import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

const PORT : number | string = process.env.PORT || 3000;
const PLAYGROUND: string = "/playground"
const GRAPHQL_ENDPOINT: string = "/graphql"

console.log(PORT)
const appOptions: Options = {
    port: PORT,
    playground:PLAYGROUND,  
    endpoint:GRAPHQL_ENDPOINT
}

const handleAppStart = () => console.log(`Listening on port ${PORT}`)

app.start(appOptions,handleAppStart);