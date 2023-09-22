import config from "./config/config";
import app from "./server";

app.listen(config.appPort, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${config.appPort}`,
  );
});
