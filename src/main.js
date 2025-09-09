import express from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routes/index.js";
import { sequelize } from "./config/db/db.js";
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
dotenv.config({ quiet: true });

app.use("/api", mainRouter);


async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log("Base de datos sincronizada");

        app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    } catch (error) {
        console.error("Error al sincronizar la base de datos", error);
    }
}

main();
