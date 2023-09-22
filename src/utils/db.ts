import { DataSource } from "typeorm";
import config from "../config/config";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  synchronize: false,
  logging: false,
  entities: ["webserver/entities/**/*.entity.{.ts,.js}"],
  migrations: ["webserver/migrations/**/*{.ts,.js}"],
});
