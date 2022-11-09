const Groups = require('../models/groupModel').model;

module.exports.sendHTMLfile =
(req,res) =>  {
   let options = {
                  root: 'public',
                  headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                  }
                };
   res.sendFile('groups.html', options);
}

const list = async (req, res) => {
  const groups = await Groups.find();
  res.status(200).json(groups);
}

const addToGroup = async (req, res, _) => {
  try {
    const newStudentInGroup = { ...req.body };  // extract object from body using '...' operator and pattern matching
    const createdStudentInGroup = await Groups.create(newStudentInGroup);
    res.status(200).json(createdStudentInGroup);
  }
  catch(error) {
    console.log("Une erreur s'est produite lors de l'ajout d'un étudiant dans un groupe");
  }
}

const removeFromGroup = async (req, res, _) => {
  try {
    const oldStudentInGroup = { ...req.body };    // extract object from body using '...' operator and pattern matching
    const removedStudentInGroup = await Groups.deleteOne(oldStudentInGroup);
    res.status(200).json(removedStudentInGroup);
  }
  catch(error) {
    console.log("Une erreur s'est produite lors de la suppression d'un étudiant d'un groupe");
  }
}

module.exports.list = list;
module.exports.add = addToGroup;
module.exports.remove = removeFromGroup;