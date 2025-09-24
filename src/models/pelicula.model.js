import {DataTypes} from 'sequelize';
import {sequelize} from "../config/db/db.js";

export const Pelicula = sequelize.define("pelicula", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    duracion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: false
    },
    reparto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    calificacion:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});