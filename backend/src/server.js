import express from "express";
import { testConnection } from "./config/db.js";
import helloRoute from "./routes/helloRoute.js";
import noteRouter from "./routes/notesRoute.js";
import cors from "cors"

const app = express();

app.use(cors());

//gunakan route
app.use(express.json());

app.use(helloRoute);
app.use(noteRouter);

const port = 3000;


app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
    testConnection();
});