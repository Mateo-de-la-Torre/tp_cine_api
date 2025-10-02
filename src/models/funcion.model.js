import { DataTypes } from "sequelize";
import { sequelize } from "../config/db/db.js";


export const Funcion = sequelize.define("funcion", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    peliculaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La pelicula es requerida"
            }
        }
    },
    salaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La sala es requerida"
            }
        }
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El precio es requerido"
            },
            min: {
                args: [0.01],
                msg: "El precio debe ser mayor a 0"
            }
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La fecha es requerida"
            },
            isDate: {
                msg: "La fecha debe ser una fecha válida"
            }
        }
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La hora es requerida"
            },
            isTime: {
                msg: "La hora debe ser una hora válida"
            }
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
})