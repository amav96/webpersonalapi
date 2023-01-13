const express = require("express");
const multiparty = require("connect-multiparty");
const CourseController = require("../controllers/course");

const md_upload = multiparty({ uploadDir: "./uploads/course" })
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/course",[md_auth.asureAuth, md_upload], CourseController.save);
api.get("/courses", CourseController.index);
api.patch("/course/:id",[md_auth.asureAuth, md_upload], CourseController.update);
api.delete("/course/:id",[md_auth.asureAuth], CourseController.remove);

module.exports = api;