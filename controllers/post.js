const Post = require("../models/post");
const image = require("../utils/image");

const save = (req,res) => {
    const post = new Post(req.body);
    post.created_at = new Date();
    
    const imagePath = image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    post.save((error, postStored) => {
        if(error){
        res.status(400).send({msg: 'Ha ocurrido un error'})
        } else {
         res.status(200).send(postStored)
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

    Post.paginate({}, options, (error, posts) => {
        if(error){
            res.status(400).send({msg: 'Ha ocurrido un error al obtener posts'})
        } else {
            res.status(200).send(posts)
        }
    });
}

const update = (req,res) => {
    const { id } = req.params;
    const postData = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    Post.findByIdAndUpdate({_id: id}, postData, (error) => {
        if(error){
            res.status(400).send({msg: 'Error al actualizar el post'})
        } else {
            res.status(200).send({ msg : 'Actualizacion correcta'})
        }
    })
}

const remove = (req,res) => {
    const { id } = req.params;

    Post.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({msg: 'Ha ocurrido un error al eliminar post'})
        } else {
            res.status(200).send({msg: 'Eliminado correctamente'})
        }
    });
}

const show = (req,res) => {
    const { path } = req.params;
    Post.findOne({path}, (error, postStored) => {
        if(error){
            res.status(500).send({msg: 'Ha ocurrido un error'})
        } else if(!postStored) {
            res.status(400).send({msg: 'No se ha encontrado ningun post'})
        } else {
            res.status(200).send(postStored)
        }
    });
}

module.exports = {
    save,
    index,
    update,
    remove,
    show
};