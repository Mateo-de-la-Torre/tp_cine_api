import { DataTypes } from 'sequelize';
import { sequelize } from "../config/db/db.js";

export const Pelicula = sequelize.define("pelicula", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "El título ya existe"
        },
        validate: {
            len: [1, 50],
            notEmpty: true,
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 500]
        }
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 60,
            max: 300
        }
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    },
    reparto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 10
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});