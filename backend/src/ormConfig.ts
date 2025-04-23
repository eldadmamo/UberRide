import {ConnectionOptions} from "typeorm";

console.log(process.env.DB_ENDPOINT)

const connectionOptions:ConnectionOptions = {
    type: "postgres",
    database: "Uber",
    synchronize: true, 
    logging: true, 
    entities:["entities/**/*.*"],
    host: process.env.DB_ENDPOINT || "localhost", 
    port:5432, 
    username: process.env.DB_USERNAME || "eldadmamo",
    password: process.env.DB_PASSWORD || ""
}

export default connectionOptions;