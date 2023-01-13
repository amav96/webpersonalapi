const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require('../utils/jwt');

const register = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!email) res.status(400).send({ msg: 'El email es obligatorio' });
    if (!password) res.status(400).send({ msg: 'La contraseña es obligatorio' });

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password,
        role: 'user',
        active: false,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear el usuario" });
        } else {
            res.status(200).send(userStorage)
        }
    });

}

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ msg: 'El email es obligatorio' });
    if (!password) return res.status(400).send({ msg: 'La contraseña es obligatorio' });

    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase }, (error, userStore) => {
        if (error || !userStore) res.status(500).send({ msg: "Error del servidor" })
        else {
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if (bcryptError) {
                    res.status(500).send({ msg: 'Error del servidor' })
                } else if (!check) {
                    res.status(400).send({ msg: 'Contraseña incorrecta' })
                } else if (!userStore.active) {
                    res.status(401).send({ msg: 'Usuario no autorizado/activo' })
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })
        }
    })
}

const refreshAccessToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).send({ msg: "Token requerido" });

    const { user_id } = jwt.decoded(token);
    if (!user_id) return res.status(404).send({ msg: "User requerido" });

    User.findOne({ _id: user_id }, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" })
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage),
            })
        }
    })
}

module.exports = {
    register,
    login,
    refreshAccessToken
}