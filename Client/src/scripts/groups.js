var groupNumber = 0;

window.addEventListener('DOMContentLoaded', askAfterLoading);

function askAfterLoading() {
    document.getElementById('0').onclick = function() { changeGroup(this); };
    document.getElementById('1').onclick = function() { changeGroup(this); };
    document.getElementById('2').onclick = function() { changeGroup(this); };
    document.getElementById('3').onclick = function() { changeGroup(this); };
    document.getElementById('4').onclick = function() { changeGroup(this); };
    document.getElementById('5').onclick = function() { changeGroup(this); };
    document.getElementById('6').onclick = function() { changeGroup(this); };
    allStudents();
}

function changeGroup(element) {
    groupNumber = parseInt(element.getAttribute('id'));
    if(element.getAttribute('id') != '0') {
        document.getElementById('title').innerHTML = "Groupe " + element.getAttribute('id');
    }
    else {
        document.getElementById('title').innerHTML = "Aucun groupe";
    }
    allStudents();
}

const allStudents = async () => {
    const requestOption =  {method:'GET'};
    const response = await fetch('http://127.0.0.1:3000/groups/all', requestOption);
    const students = await response.json();
    fillStudentList(students);
}

function fillStudentList(studentsJson) {
    const table = document.getElementById("displayGroup");
    table.innerHTML = "<tr> <th>Numéro</th> <th>Nom</th> <th>Prénom</th> </tr>";

    const linesArray = [];
    const numCells = [];
    const nameCells = [];
    const firstnameCells = [];

    studentsJson.forEach(parentElement => {
        if(parentElement['numGroup'] == groupNumber) {
            const element = parentElement['student']

            const newLine = table.insertRow();
            const newNumberCell = newLine.insertCell(0);
            const newNameCell = newLine.insertCell(1);
            const newFirstnameCell = newLine.insertCell(2);
            const newChangeGroup = newLine.insertCell(3);

            newNumberCell.innerHTML = element['numStudent'];
            newNameCell.innerHTML = element['name'];
            newFirstnameCell.innerHTML = element['firstnames'];

            newChangeGroup.innerHTML = "<button class=\"changeGroup\" type=\"button\" id=\"0-" + element['numStudent'] + "\">0</button>";
            newChangeGroup.innerHTML = newChangeGroup.innerHTML + "<button class=\"changeGroup\" type=\"button\" id=\"1-" + element['numStudent'] + "\">1</button>";
            newChangeGroup.innerHTML = newChangeGroup.innerHTML + "<button class=\"changeGroup\" type=\"button\" id=\"2-" + element['numStudent'] + "\">2</button>";
            newChangeGroup.innerHTML = newChangeGroup.innerHTML + "<button class=\"changeGroup\" type=\"button\" id=\"3-" + element['numStudent'] + "\">3</button>";
            newChangeGroup.innerHTML = newChangeGroup.innerHTML + "<button class=\"changeGroup\" type=\"button\" id=\"4-" + element['numStudent'] + "\">4</button>";
            newChangeGroup.innerHTML = newChangeGroup.innerHTML + "<button class=\"changeGroup\" type=\"button\" id=\"5-" + element['numStudent'] + "\">5</button>";
            newChangeGroup.innerHTML = newChangeGroup.innerHTML + "<button class=\"changeGroup\" type=\"button\" id=\"6-" + element['numStudent'] + "\">6</button>";

            linesArray.push(newLine);
            numCells.push(newNumberCell);
            nameCells.push(newNameCell);
            firstnameCells.push(newFirstnameCell);
        }
    });

    const groupsButtons = document.getElementsByClassName('changeGroup');
    Array.prototype.forEach.call(groupsButtons, function(element) {
        element.onclick = function() { changeElementGroup(this); };
    });
}

const changeElementGroup = async (element) => {
    //Extraire numéro de groupe
    const numGrp = parseInt(element.id[0]);
    //Extraire numéro d'étudiant
    const numEtudiant = parseInt(element.id.substring(2, element.id.length));
    //Récupérer l'étudiant correspondant
    const requestOption =  {method:'GET'};
    const response = await fetch('http://127.0.0.1:3000/groups/all', requestOption);
    const students = await response.json();
    var findedStudent = null;
    students.forEach(parentElement => {
        const element = parentElement['student']
        if(element['numStudent'] == numEtudiant) {
            findedStudent = element;
        }
    });
    //Supprimer l'ancienne entrée du groupe
    await removeInGroup(groupNumber, findedStudent);
    //Ajouter la nouvelle entrée
    const newStudentInGroup = {
        numGroup : numGrp,
        student : findedStudent,
      };
      const bodyContent = JSON.stringify(newStudentInGroup);
      const requestOptions = {
        method :'POST',
        headers : { "Content-Type": "application/json" },
        body : bodyContent
      };
      const response2 = await fetch('http://localhost:3000/groups/add', requestOptions);
      //Mise à jour de la table
      allStudents();
}

const removeInGroup =
  async (numGroupToRemove, studentToRemove) => {
    const newStudentInGroup = {
      numGroup : numGroupToRemove,
      student : studentToRemove,
    };
    // body is built from created student
    const bodyContent2 = JSON.stringify(newStudentInGroup);
    // options for a POST method that conains json
    const requestOptions2 = {
      method :'POST',
      headers : { "Content-Type": "application/json" },
      body : bodyContent2
    };
    // send the request to the server to create the entry corresponding to book
    const response2 = await fetch('http://localhost:3000/groups/remove', requestOptions2);
  }