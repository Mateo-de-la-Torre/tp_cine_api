import { DataTypes } from "sequelize";
import { sequelize } from "../config/db/db.js";


export const Sala = sequelize.define("sala", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numeroSala: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El número de sala es requerido"
            },
            isInt: {
                msg: "El número de sala debe ser un entero"
            },
            min: {
                args: [1],
                msg: "El número de sala debe ser mayor a 0"
            }
        }
    },
    tipoSala: {
        type: DataTypes.ENUM("2D", "3D", "4D"),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El tipo de sala es requerido"
            },
            isIn: {
                args: [["2D", "3D", "4D"]],
                msg: "El tipo de sala debe ser 2D, 3D o 4D"
            }
        }
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La capacidad es requerida"
            }
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    hooks: {
        afterSync: async () => {
            const count = await Sala.count();
            if (count === 0) {
                await Sala.bulkCreate([
                    { numeroSala: 1, tipoSala: "2D", capacidad: 150, estado: true },
                    { numeroSala: 2, tipoSala: "3D", capacidad: 200, estado: true },
                    { numeroSala: 3, tipoSala: "4D", capacidad: 100, estado: true },
                    { numeroSala: 4, tipoSala: "2D", capacidad: 180, estado: true },
                    { numeroSala: 5, tipoSala: "3D", capacidad: 220, estado: true }
                ]);
            }
        }
    }
})