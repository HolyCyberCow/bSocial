import { DataSource } from "typeorm";
import config from "../config/config";
import path from "path";

const postgresConfig = {
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
};

const pathConfigs = {
  entities: [path.join(__dirname, "..", "entities/*{.js,.ts}")],
  migrations: [path.join(__dirname, "..", "migrations/*{.js,.ts}")],
};

export const PostgresDataSource = new DataSource({
  ...postgresConfig,
  type: "postgres",
  synchronize: false,
  logging: false,
  ...pathConfigs,
});
