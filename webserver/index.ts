import { config } from "dotenv";
config({ path: "./.env" });
import app from "./server";

const port = Number(process.env.PORT || 8080);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
