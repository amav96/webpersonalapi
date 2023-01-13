const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/post");

const md_upload = multiparty({ uploadDir: "./uploads/blog" })
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/post",[md_auth.asureAuth, md_upload], PostController.save);
api.get("/posts", PostController.index);
api.patch("/post/:id",[md_auth.asureAuth, md_upload], PostController.update);
api.delete("/post/:id",[md_auth.asureAuth], PostController.remove);
api.get("/post/:path", PostController.show);

module.exports = api;



