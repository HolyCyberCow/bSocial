// import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../config/config";
import path from "path";
const isTsNode = process[Symbol.for("ts-node.register.instance")];
// console.log(isTsNode);
const postgresConfig = {
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
};

const pathConfigs = {
  // entities: ["./dist/src/entities/*.js"],
  // migrations: ["./dist/src/migrations/*.js"]
  entities: [path.join(__dirname, "..", "entities/*{.js,.ts}")],
  migrations: [path.join(__dirname, "..", "migrations/*{.js,.ts}")],
};

// console.log(postgresConfig);
console.log(__dirname);
console.log(process.cwd());
export const PostgresDataSource = new DataSource({
  ...postgresConfig,
  type: "postgres",
  synchronize: false,
  logging: false,
  ...pathConfigs,
});
console.log(PostgresDataSource.driver.options.entities);
console.log(PostgresDataSource.driver.options.migrations);
