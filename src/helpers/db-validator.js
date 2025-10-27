import { ValidationError, Op } from "sequelize";
import { User, Pelicula, Sala, Funcion, Reserva } from "../models/index.js";


// AUTH
export const emailValidate = (email) => {

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError('El formato del email es inválido');
    }

    return email.toLowerCase();
}


export const passwordValidate = (password) => {

    const minLength = 8;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

    if (password.length < minLength) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    if (!passwordRegex.test(password)) {
        throw new Error('La contraseña debe tener al menos una letra y un número')
    }

    return password;
}


export const existEmail = async (email) => {

    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) {
        throw new ValidationError(`El email ya esta registrado`);
    }

    return email;
}

// USER
export const existUserId = async (id) => {
    const existID = await User.findByPk(id);
    if (!existID) {
        throw new ValidationError(`No existe un usuario con el id: ${id} `);
    }

    return id;
}

// PELICULA
export const existPeliculaId = async (peliculaId) => {

    const pelicula = await Pelicula.findByPk(peliculaId);
    if (!pelicula) {
        throw new ValidationError(`No existe una película con el ID: ${peliculaId}`);
    }

    return peliculaId;
}

export const peliculaActiva = async (peliculaId) => {
    if (!peliculaId) {
        throw new ValidationError(`La película es requerida`);
    }

    const pelicula = await Pelicula.findOne({ where: { id: peliculaId, estado: true } });
    if (!pelicula) {
        throw new ValidationError(`No existe una película activa con el ID: ${peliculaId}`);
    }
    return peliculaId;
}


export const calcularHoraFin = async (fecha, horaInicio, duracionMinutos) => {
    const fechaHoraCompleta = new Date(`${fecha}T${horaInicio}:00`);

    fechaHoraCompleta.setMinutes(fechaHoraCompleta.getMinutes() + duracionMinutos);

    return fechaHoraCompleta.toTimeString().slice(0, 5);
}

export const verificarSolapamiento = async (salaId, fecha, hora, horaFin, funcionIdExcluir = null) => {

    const horaAMinutos = (hora) => {
        const [h, m] = hora.split(':').map(Number);
        return h * 60 + m;
    }

    const inicioNueva = horaAMinutos(hora);
    const finNueva = horaAMinutos(horaFin);

    const whereCondition = {
        salaId,
        fecha,
        estado: true
    };

    // Si se proporciona un funcionIdExcluir, excluirlo de la búsqueda
    if (funcionIdExcluir) {
        whereCondition.id = {
            [Op.ne]: funcionIdExcluir
        };
    }

    const funcionExistente = await Funcion.findAll({
        where: whereCondition
    });

    const haySolapamiento = funcionExistente.some(funcion => {
        const inicioExistente = horaAMinutos(funcion.hora);
        const finExistente = horaAMinutos(funcion.horaFin);

        const finExistenteAjustado = finExistente < inicioExistente ? finExistente + 1440 : finExistente;
        const finNuevaAjustado = finNueva < inicioNueva ? finNueva + 1440 : finNueva;

        return (inicioExistente < finNuevaAjustado && finExistenteAjustado > inicioNueva);
    });

    if (haySolapamiento) {
        throw new ValidationError(`Ya existe una función en esta sala, fecha y hora`);
    }

    return true;

}


// FUNCION
export const existFuncionId = async (funcionId) => {
    const funcion = await Funcion.findByPk(funcionId);
    if (!funcion) {
        throw new ValidationError(`No existe la función con el ID: ${funcionId}`);
    }
    return funcionId;
}

export const fechaHoraFuncion = async (fecha, hora) => {

    if (!fecha) {
        throw new ValidationError(`La fecha es requerida`);
    }

    if (!hora) {
        throw new ValidationError(`La hora es requerida`);
    }

    const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!horaRegex.test(hora)) {
        throw new ValidationError(`El formato de la hora debe ser HH:MM (24 horas)`);
    }

    const fechaHoraCompleta = new Date(`${fecha}T${hora}:00`);
    const ahora = new Date();


    if (fechaHoraCompleta <= ahora) {
        throw new ValidationError(`La fecha y hora de la función debe ser mayor a la fecha y hora actual`);
    }

    return { fecha, hora };
}

//SALA
export const existSalaId = async (salaId) => {
    const sala = await Sala.findByPk(salaId);
    if (!sala) {
        throw new ValidationError(`No existe la sala ${salaId}`);
    }

    return salaId;
}

export const salaActiva = async (salaId) => {

    if (!salaId) {
        throw new ValidationError(`La sala es requerida`);
    }

    const sala = await Sala.findOne({ where: { id: salaId, estado: true } });
    if (!sala) {
        throw new ValidationError(`No existe una sala activa con el ID: ${salaId}`);
    }
    return salaId;
}

export const existNumeroSala = async (numeroSala) => {
    const sala = await Sala.findOne({ where: { numeroSala } });
    if (sala) {
        throw new ValidationError(`Ya existe la sala número ${numeroSala}`);
    }
    return numeroSala;
}

// RESERVA
export const existReservaId = async (reservaId) => {
    const reserva = await Reserva.findByPk(reservaId);
    if (!reserva) {
        throw new ValidationError(`No existe la reserva con el ID: ${reservaId}`);
    }
    return reservaId;
}
