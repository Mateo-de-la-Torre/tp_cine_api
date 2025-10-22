import { DataTypes } from "sequelize";
import { sequelize } from "../config/db/db.js";



export const Reserva = sequelize.define("Reserva", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El usuario es requerido"
            }
        }
    },
    funcionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La función es requerida"
            }
        }
    },
    cantidadAsientos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cantidad de asientos es requerida"
            },
            min: {
                args: [1],
                msg: "La cantidad de asientos debe ser mayor a 0"
            },
            max: {
                args: [5],
                msg: "La cantidad de asientos debe ser menor a 5"
            }
        }
    },
    precioTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    updatedAt: false
});

