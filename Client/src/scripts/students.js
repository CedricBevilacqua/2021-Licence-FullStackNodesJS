window.addEventListener('DOMContentLoaded', askAfterLoading);

function askAfterLoading() {
    allStudents();
    document.getElementById('createUpdate').addEventListener('click', askForStudentCreation);
    document.getElementById('clear').addEventListener('click', askForStudentRemoving);
}

const allStudents = async () => {
    const requestOption =  {method:'GET'};
    const response = await fetch('http://127.0.0.1:3000/students/all', requestOption);
    const students = await response.json();
    fillStudentList(students);
}

function fillStudentList(studentsJson) {
    const table = document.getElementById("allStudents");
    table.innerHTML = "<tr> <th>Numéro</th> <th>Nom</th> <th>Prénom</th> </tr>";

    const linesArray = [];
    const numCells = [];
    const nameCells = [];
    const firstnameCells = [];

    studentsJson.forEach(element => {
        const newLine = table.insertRow();
        const newNumberCell = newLine.insertCell(0);
        const newNameCell = newLine.insertCell(1);
        const newFirstnameCell = newLine.insertCell(2);

        newNumberCell.innerHTML = element['numStudent'];
        newNameCell.innerHTML = element['name'];
        newFirstnameCell.innerHTML = element['firstnames'];

        linesArray.push(newLine);
        numCells.push(newNumberCell);
        nameCells.push(newNameCell);
        firstnameCells.push(newFirstnameCell);
    });
}

const askForStudentCreation =
  async () => {
    // retrieve data about student to create from the input fields
    const newStudent = {
                      name : studentName.value,
                      firstnames : studentFirstnames.value,
                      numStudent : studentNumber.value
                      };
    // body is built from created student
    const bodyContent = JSON.stringify(newStudent);
    // options for a POST method that conains json
    const requestOptions = {
                              method :'POST',
                              headers : { "Content-Type": "application/json" },
                              body : bodyContent
                            };
    // send the request to the server to create the entry corresponding to book
    const response = await fetch('http://localhost:3000/students/create', requestOptions);

    // retrieve data about student to create from the input fields
    const newStudentInGroup = {
      numGroup : 0,
      student : newStudent,
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
    const response2 = await fetch('http://localhost:3000/groups/add', requestOptions2);
    
    allStudents();
  }

  const askForStudentRemoving =
  async () => {
    // retrieve data about student to create from the input fields
    const newStudent = {
                      name : studentName.value,
                      firstnames : studentFirstnames.value,
                      numStudent : studentNumber.value
                      };
    // body is built from created student
    const bodyContent = JSON.stringify(newStudent);
    // options for a POST method that conains json
    const requestOptions = {
                              method :'POST',
                              headers : { "Content-Type": "application/json" },
                              body : bodyContent
                            };
    // send the request to the server to create the entry corresponding to book
    const response = await fetch('http://localhost:3000/students/remove', requestOptions);

    removeInGroup(0);
    removeInGroup(1);
    removeInGroup(2);
    removeInGroup(3);
    removeInGroup(4);
    removeInGroup(5);
    removeInGroup(6);
    allStudents();
  }

  const removeInGroup =
  async (numGroupToRemove) => {
    // retrieve data about student to create from the input fields
    var findedStudentEntry = null;
    const requestOption =  {method:'GET'};
    const findResponse = await fetch('http://127.0.0.1:3000/groups/all', requestOption);
    const studentsJson = await findResponse.json();
    studentsJson.forEach(element => {
      studentElement = element['student']
      if(studentElement['numStudent'] == studentNumber.value) {
        findedStudentEntry = studentElement;
      }
    });
    const newStudentInGroup = {
      numGroup : numGroupToRemove,
      student : findedStudentEntry,
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