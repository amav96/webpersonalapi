const Menu = require("../models/menu");

const save = (req,res) => {
    const menu = new Menu(req.body);
    console.log(menu)
    menu.save((error, menuStored) => {
        if(error){
        res.status(400).send({msg: 'Ha ocurrido un error'})
        } else {
         res.status(200).send(menuStored)
        }
    })
}

const index = async (req,res) => {
    const { active } = req.query;

    let response = null;
    if(active === undefined){
        response = await Menu.find().sort({ order: "asc"});
    } else{
        response = await Menu.find({ active }).sort({ order: "asc"})
    }

    res.status(200).send(response);
}

const update = (req,res) => {
    const { id } = req.params;
    const menuData = req.body;

    Menu.findByIdAndUpdate({_id: id}, menuData, (error) => {
        if(error){
            res.status(400).send({msg: 'Error al actualizar el menu'})
        } else {
            res.status(200).send({ msg : 'Actualizacion correcta'})
        }
    })
}

const remove = (req,res) => {
    const { id } = req.params;

    Menu.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({msg: 'Ha ocurrido un error al eliminar menu'})
        } else {
            res.status(200).send({msg: 'Eliminado correctamente'})
        }
    });
}

module.exports = {
    save,
    index,
    update,
    remove,
};