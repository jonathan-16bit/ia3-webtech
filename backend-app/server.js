const express = require("express");
const cors = require("cors");

// Create server app
const app = express();
app.use(cors());
app.use(express.json()); // communication bw client and server is thru JSON

// Database connection code
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/college")
  .then(() => {
    console.log("DB connected")
  })
  .catch((err) => {
    console.log(err)
  })

const studentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  regno: {type: Number, required: true, unique: true},
  cgpa: {type: Number, required: true},
})

// Model: logical object between server program and MongoDB database
// Last param: existing collection name ("students") created in MongoDB compass
// (name_of_model, structure_of_model, collection_name)
const Student = mongoose.model("Student", studentSchema, "students")

// Create HTTP APIs
app.get("/", async (req, res) => {
  // res.send("Hello from express boi")
  res.status(200).json({"message": "Data saved boi"})
});

app.post("/saveStudent", async (req, res) => {
  try {
    // Receive from React -> Express (in JSON format)
    const student = req.body

    // Prepare data wrt Student model, save/store to DB
    const newStudent = new Student(student)
    await newStudent.save() // await creates a thread

    try {
      res.status(200).json({
        "message": "Data saved successfully"
      }) 
    } catch(err) {
      res.status(500).json({
        "message": "Error: " + err
      })
    }

  } catch (err) {
    console.log(err)
  }
})

// Start server
app.listen(5000, () => {
  console.log("Server is running at port 5000 boi")
});
