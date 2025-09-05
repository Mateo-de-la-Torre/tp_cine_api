import express from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
dotenv.config({ quiet: true });

app.use("/api", mainRouter);


async function main() {
    try {
        app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
}

main();
