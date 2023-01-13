const express = require("express");
const md_auth = require('../middlewares/authenticated')
const MenuController = require("../controllers/menu");

const api = express.Router();

api.post('/menu', [md_auth.asureAuth], MenuController.save);
api.get('/menu', MenuController.index);
api.patch('/menu/:id', [md_auth.asureAuth], MenuController.update);
api.delete('/menu/:id', [md_auth.asureAuth], MenuController.remove);

module.exports = api;