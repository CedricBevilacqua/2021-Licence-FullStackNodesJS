const Students = require('../models/studentModel').model;

module.exports.sendHTMLfile =
(req,res) =>  {
   let options = {
                  root: 'public',
                  headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                  }
                };
   res.sendFile('students.html', options);
}

const list = async (req, res) => {
  const students = await Students.find();
  res.status(200).json(students);
}

const createStudent = async (req, res, _) => {
  try {
    const newStudent = { ...req.body };    // extract object from body using '...' operator and pattern matching
    const createdStudent = await Students.create(newStudent);
    res.status(200).json(createdStudent);
  }
  catch(error) {
    console.log("Une erreur s'est produite lors de la création d'un nouvel étudiant dans la BDD");
  }
}

const removeStudent = async (req, res, _) => {
  try {
    const oldStudent = { ...req.body };    // extract object from body using '...' operator and pattern matching
    const removedStudent = await Students.deleteOne(oldStudent);
    res.status(200).json(removedStudent);
  }
  catch(error) {
    console.log("Une erreur s'est produite lors de la suppression d'un étudiant dans la BDD");
  }
}


module.exports.list = list;
module.exports.create = createStudent;
module.exports.remove = removeStudent;