const express = require("express");
const app = express();
const tododb = require("./models");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

const port = process.env.PORT || 8000;
app.use(express.json()); //This is a new method for post insted of using body-parser!

mongoose.connect("mongodb://0.0.0.0:27017/todos", {
  keepAlive: true, //This is to keep the connection
  useNewUrlParser: true, // Need to know what is this, yet!
});

let db = mongoose.connection.once("open", () => {
  console.log("DB is connected Successfully");
});

// db.on('error', () => console.log(error));         //This is when the error occured
// db.once('open' / 'disconnected , () => console.log("DB connection has been succesfull"))
// This is occured when the connection established!

//GET
app.get("/api/todos", async (req, res, next) => {
  const todo = await tododb.find();
  if (todo) {
    return res.status(200).send(todo);
  }
  res.status(404).send("error");
});

//GET
app.get("/api/todos/:id", async (req, res, next) => {
  const todo = await tododb.find({
    _id: req.params.id,
  });
  res.status(200).send(todo);
});

//POST
app.post("/api/todos", async (req, res, next) => {
  try {
    const todo = await tododb.create(req.body);

    //We can also save the todo to DB in this way
    // const newtodo = new tododb({
    //     tasks : req.body.tasks,
    //     description : req.body.description,
    //     status : req.body.status
    // });
    // newtodo.save();

    res.status(200).send(todo);
  } catch (error) {
    res.send({ status: 400, message: "failed to get todos" });
  }
});

/* The { new : true } in line findByIdAndUpdate is to show the changes 
   in the console or else it will only show in DB! */

//UPDATE
app.patch("/api/todos/:id", async (req, res, next) => {
  try {
    const todo = await tododb.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.send(todo);
  } catch (error) {
    next({ status: 400, message: "failed to update todo!" });
  }
});

//DELETE
app.delete("/api/todos/:id", async (req, res, next) => {
  try {
    const todo = await tododb.findOneAndRemove({ _id: req.params.id });
    res.status(200).send(`${todo} This todo has been deleted successfully!`);
  } catch (error) {
    next({ status: 400, message: "failed to update todo!" });
  }
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
