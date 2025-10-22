import { User } from "./user.model.js";
import { Pelicula } from "./pelicula.model.js";
import { Funcion } from "./funcion.model.js";
import { Sala } from "./sala.model.js";
import { Reserva } from "./reserva.model.js";


Pelicula.hasMany(Funcion, { foreignKey: "peliculaId" });
Funcion.belongsTo(Pelicula, { foreignKey: "peliculaId" });

Sala.hasMany(Funcion, { foreignKey: "salaId" });
Funcion.belongsTo(Sala, { foreignKey: "salaId" });

User.hasMany(Reserva, { foreignKey: "userId" });
Reserva.belongsTo(User, { foreignKey: "userId" });

Funcion.hasMany(Reserva, { foreignKey: "funcionId" });
Reserva.belongsTo(Funcion, { foreignKey: "funcionId" });