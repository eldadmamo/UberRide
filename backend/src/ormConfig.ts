import {ConnectionOptions} from "typeorm";

console.log(process.env.DB_ENDPOINT)

const connectionOptions:ConnectionOptions = {
    type: "postgres",
    database: "Ubernew",
    synchronize: true, 
    logging: true, 
    entities:[__dirname + "/entities/**/*.ts"],
    host: process.env.DB_ENDPOINT || "localhosting", 
    port:5432, 
    username: process.env.DB_USERNAME || "eldadmamo",
    password: process.env.DB_PASSWORD || ""
}

export default connectionOptions;