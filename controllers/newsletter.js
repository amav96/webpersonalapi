const Newsletter = require("../models/newsletter");

const suscribeEmail = (req,res) => {
    const {email} = req.body;
    if(!email) res.status(400).send({msg: 'Email requerido'});
    const newsletter = new Newsletter({
        email: email.toLowerCase(),
        created_at: new Date()
    });

    newsletter.save((error, newsletterStored) => {
        if(error){
        res.status(400).send({msg: 'Ha ocurrido un error'})
        } else {
         res.status(200).send({msg: 'Email registrado'})
        }
    })
}

const index = async (req,res) => {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc"}
    }

    Newsletter.paginate({}, options, (error, newsletter) => {
        if(error){
            res.status(400).send({msg: 'Ha ocurrido un error al obtener newsletter'})
        } else {
            res.status(200).send(newsletter)
        }
    });
}

const remove = (req,res) => {
    const { id } = req.params;

    Newsletter.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({msg: 'Ha ocurrido un error al eliminar newsletter'})
        } else {
            res.status(200).send({msg: 'Eliminado correctamente'})
        }
    });
}


module.exports = {
    suscribeEmail,
    index,
    remove,
};