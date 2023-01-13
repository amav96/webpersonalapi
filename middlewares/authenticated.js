const jwt = require('../utils/jwt');

const asureAuth = (req,res, next) => {
    let token = req.headers.authorization
    if(!token){
        return res.status(403).send({msg: "La peticion no tiene la cabecera de autenticacion"})
    }
    token = token.replace("Bearer ", "");

    try {
        const payload = jwt.decoded(token);
        const {exp} = payload;
        const currentData = new Date().getTime();

        if(exp <= currentData){
            return res.status(400).send({msg: "El token ha expirado"})
        }

        req.user = payload;
        next();

    } catch (error) {
        return res.status(400).send({msg: "Token invalido"})
    }

}

module.exports = {
    asureAuth
}