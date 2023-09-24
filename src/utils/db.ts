import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../config/config";

const postgresConfig = {
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
};

export const PostgresDataSource = new DataSource({
  ...postgresConfig,
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: ["dist/src/entities/**/*.entity.{.ts,.js}"],
  migrations: ["dist/src/migrations/**/*{.ts,.js}"],
});
