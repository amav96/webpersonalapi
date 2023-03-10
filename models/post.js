const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PostSchema = mongoose.Schema({
    title: String,
    miniature: String,
    path: {
        type: String,
        unique: true,
    },
    created_at: Date,
    content: String
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);