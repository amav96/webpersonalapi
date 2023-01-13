const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require('../middlewares/authenticated')

const md_upload = multiparty({ uploadDir: './uploads/avatar'});
const api = express.Router();

api.get("/user/me",[md_auth.asureAuth,], UserController.show);
api.get("/users",[md_auth.asureAuth,], UserController.index);
api.post("/user",[md_auth.asureAuth, md_upload], UserController.save);
api.patch("/user/:id",[md_auth.asureAuth , md_upload], UserController.update);
api.delete("/user/:id",[md_auth.asureAuth], UserController.remove);

module.exports = api;