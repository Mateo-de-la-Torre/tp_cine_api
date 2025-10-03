import { ValidationError } from "sequelize";
import { User } from "../models/user.model.js";
import { Pelicula } from "../models/pelicula.model.js";
import { Sala } from "../models/sala.model.js";
import { Funcion } from "../models/funcion.model.js";


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



// FUNCION
export const existFuncionId = async (funcionId) => {
    const funcion = await Funcion.findByPk(funcionId);
    if (!funcion) {
        throw new ValidationError(`No existe la función con el ID: ${funcionId}`);
    }
    return funcionId;
}


//SALA
export const existSalaId = async (salaId) => {
    const sala = await Sala.findByPk(salaId);
    if (!sala) {
        throw new ValidationError(`No existe la sala ${salaId}`);
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
