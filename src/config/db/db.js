import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false // Desactiva todos los logs de SQL
});
