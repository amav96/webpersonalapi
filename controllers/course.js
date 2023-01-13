const Course = require("../models/course");
const image = require("../utils/image");

const save = async (req,res) => {
    const course = new Course(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;

    course.save((error, courseStored) => {
        if(error){
            res.status(400).send({msg: 'Error al crear curso'})
        } else {
            res.status(200).send(courseStored)
        }
    })
}

const index = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    }

    Course.paginate({}, options, (error, courses) => {
        if(error){
            res.status(400).send({msg: 'Ha ocurrido un error al obtener cursos'})
        } else {
            res.status(200).send(courses)
        }
    });

}

const update = (req,res) => {
    const {id} = req.params;
    const courseData = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
    }

    Course.findOneAndUpdate({_id: id}, courseData, (error) => {
        if(error){
            res.status(400).send({msg: 'Ha ocurrido un error al actualizar el curso'})
        } else {
            res.status(200).send({msg: 'Realizado correctamente'})
        }
    });
}

const remove = (req, res) => {
    const {id} = req.params;
    Course.findByIdAndDelete(id, (error) => {
        if(error){
            res.status(400).send({msg: 'Ha ocurrido un error al eliminar'})
        } else {
            res.status(200).send({msg: 'Eliminado correctamente'})
        }
    })
}

module.exports = {
    save,
    index,
    update,
    remove
};