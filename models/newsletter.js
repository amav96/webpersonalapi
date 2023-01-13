const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const NewsletterSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    created_at: Date,
});

NewsletterSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Newsletter", NewsletterSchema);