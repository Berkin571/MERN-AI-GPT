import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import router from "./routes/index.js";
config();
const app = express();
// middlewares
app.use(express.json());
// TODO: remove it in the production
app.use(morgan("dev"));
app.use("/api/v1", router);
export default app;
//# sourceMappingURL=app.js.map