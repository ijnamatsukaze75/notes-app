import express from "express";
import { testConnection } from "./config/db.js";
import helloRoute from "./routes/helloRoute.js";
import noteRouter from "./routes/notesRoute.js";

const app = express();
const port = 3000;

//gunakan route
app.use(express.json());

app.use(helloRoute);
app.use(noteRouter);




app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
    testConnection();
});