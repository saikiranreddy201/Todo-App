const mongoose = require("mongoose");

const todoschema = new mongoose.Schema ({
    title : String,
    description : String,
});


//This is to keep the given schema in the given collection (tasks)!
const tododb = mongoose.model("tasks", todoschema);
module.exports = tododb;
