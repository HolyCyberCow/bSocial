import config from "./config/config";
import app from "./server";
import { PostgresDataSource } from "./utils/db";

PostgresDataSource.initialize()
  .then(async () => {
    app.listen(config.appPort, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${config.appPort}`,
      );
    });
  })
  .catch((error) => console.log(error));
