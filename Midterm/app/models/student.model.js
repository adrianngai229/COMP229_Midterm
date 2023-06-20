const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: String,
    age: Number,
    major: String,

}, {
    timestamps: {
        createdDate: "createdDate",
        updatedDate: "updatedDate",
    }
});

module.exports = mongoose.model('Student', StudentSchema);