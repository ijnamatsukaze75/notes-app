import express from "express";
import { testConnection } from "./config/db.js";
import helloRoute from "./routes/helloRoute.js";

const app = express();
const port = 3000;

//gunakan route
app.use("/", helloRoute);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
    testConnection();
});