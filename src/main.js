import express from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routes/index.js";
import { sequelize } from "./config/db/db.js";
import "./models/index.js";


dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Middleware de CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


// Routes
app.use("/api", mainRouter);


async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log("Base de datos sincronizada");

        app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    } catch (error) {
        console.error("Error al sincronizar la base de datos", error);
    }
}

main();
