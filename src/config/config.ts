import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: "./.env" });
import {
  DEFAULT_APP_ACCESS_TOKEN_EXPIRES_IN_MINUTES,
  DEFAULT_APP_JTW_REFRESH_TOKEN_PRIVATE_KEY,
  DEFAULT_APP_JWT_ACCESS_TOKEN_PRIVATE_KEY,
  DEFAULT_APP_JWT_ACCESS_TOKEN_PUBLIC_KEY,
  DEFAULT_APP_JWT_REFRESH_TOKEN_PUBLIC_KEY,
  DEFAULT_APP_PORT,
  DEFAULT_APP_REFRESH_TOKEN_EXPIRES_IN_MINUTES,
  DEFAULT_CORS_ORIGIN,
  DEFAULT_KAFKA_HOST,
  DEFAULT_KAFKA_PORT,
  DEFAULT_NODE_ENV,
  DEFAULT_POSTGRES_DB,
  DEFAULT_POSTGRES_HOST,
  DEFAULT_POSTGRES_PASSWORD,
  DEFAULT_POSTGRES_PORT,
  DEFAULT_POSTGRES_USER,
} from "./defaults";

export default {
  nodeEnv: process.env.NODE_ENV || DEFAULT_NODE_ENV,
  appPort: Number(process.env.APP_PORT || DEFAULT_APP_PORT),
  corsOrigin: process.env.CORS_ORIGIN || DEFAULT_CORS_ORIGIN,
  keys: {
    accessToken: {
      privateKey:
        process.env.APP_JWT_ACCESS_TOKEN_PRIVATE_KEY ||
        DEFAULT_APP_JWT_ACCESS_TOKEN_PRIVATE_KEY,
      publicKey:
        process.env.APP_JWT_ACCESS_TOKEN_PUBLIC_KEY ||
        DEFAULT_APP_JWT_ACCESS_TOKEN_PUBLIC_KEY,
    },
    refreshToken: {
      privateKey:
        process.env.APP_JWT_REFRESH_TOKEN_PRIVATE_KEY ||
        DEFAULT_APP_JTW_REFRESH_TOKEN_PRIVATE_KEY,
      publicKey:
        process.env.APP_JWT_REFRESH_TOKEN_PUBLIC_KEY ||
        DEFAULT_APP_JWT_REFRESH_TOKEN_PUBLIC_KEY,
    },
  },
  accessTokenExpiresInMinutes:
    Number(process.env.APP_ACCESS_TOKEN_EXPIRES_IN_MINUTES) ||
    DEFAULT_APP_ACCESS_TOKEN_EXPIRES_IN_MINUTES,
  refreshTokenExpiresInMinutes:
    Number(process.env.APP_REFRESH_TOKEN_EXPIRES_IN_MINUTES) ||
    DEFAULT_APP_REFRESH_TOKEN_EXPIRES_IN_MINUTES,
  database: {
    name: process.env.POSTGRES_DB_NAME || DEFAULT_POSTGRES_DB,
    user: process.env.POSTGRES_USER || DEFAULT_POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD || DEFAULT_POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST || DEFAULT_POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || DEFAULT_POSTGRES_PORT,
  },
  kafka: {
    port: Number(process.env.KAFKA_PORT) || DEFAULT_KAFKA_PORT,
    host: process.env.KAFKA_HOST || DEFAULT_KAFKA_HOST,
  },
};
