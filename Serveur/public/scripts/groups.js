/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/groups.js":
/*!*******************************!*\
  !*** ./src/scripts/groups.js ***!
  \*******************************/
/***/ (() => {

eval("var groupNumber = 0;\nwindow.addEventListener('DOMContentLoaded', askAfterLoading);\n\nfunction askAfterLoading() {\n  document.getElementById('0').onclick = function () {\n    changeGroup(this);\n  };\n\n  document.getElementById('1').onclick = function () {\n    changeGroup(this);\n  };\n\n  document.getElementById('2').onclick = function () {\n    changeGroup(this);\n  };\n\n  document.getElementById('3').onclick = function () {\n    changeGroup(this);\n  };\n\n  document.getElementById('4').onclick = function () {\n    changeGroup(this);\n  };\n\n  document.getElementById('5').onclick = function () {\n    changeGroup(this);\n  };\n\n  document.getElementById('6').onclick = function () {\n    changeGroup(this);\n  };\n\n  allStudents();\n}\n\nfunction changeGroup(element) {\n  groupNumber = parseInt(element.getAttribute('id'));\n\n  if (element.getAttribute('id') != '0') {\n    document.getElementById('title').innerHTML = \"Groupe \" + element.getAttribute('id');\n  } else {\n    document.getElementById('title').innerHTML = \"Aucun groupe\";\n  }\n\n  allStudents();\n}\n\nconst allStudents = async () => {\n  const requestOption = {\n    method: 'GET'\n  };\n  const response = await fetch('http://127.0.0.1:3000/groups/all', requestOption);\n  const students = await response.json();\n  fillStudentList(students);\n};\n\nfunction fillStudentList(studentsJson) {\n  const table = document.getElementById(\"displayGroup\");\n  table.innerHTML = \"<tr> <th>Numéro</th> <th>Nom</th> <th>Prénom</th> </tr>\";\n  const linesArray = [];\n  const numCells = [];\n  const nameCells = [];\n  const firstnameCells = [];\n  studentsJson.forEach(parentElement => {\n    if (parentElement['numGroup'] == groupNumber) {\n      const element = parentElement['student'];\n      const newLine = table.insertRow();\n      const newNumberCell = newLine.insertCell(0);\n      const newNameCell = newLine.insertCell(1);\n      const newFirstnameCell = newLine.insertCell(2);\n      const newChangeGroup = newLine.insertCell(3);\n      newNumberCell.innerHTML = element['numStudent'];\n      newNameCell.innerHTML = element['name'];\n      newFirstnameCell.innerHTML = element['firstnames'];\n      newChangeGroup.innerHTML = \"<button class=\\\"changeGroup\\\" type=\\\"button\\\" id=\\\"0-\" + element['numStudent'] + \"\\\">0</button>\";\n      newChangeGroup.innerHTML = newChangeGroup.innerHTML + \"<button class=\\\"changeGroup\\\" type=\\\"button\\\" id=\\\"1-\" + element['numStudent'] + \"\\\">1</button>\";\n      newChangeGroup.innerHTML = newChangeGroup.innerHTML + \"<button class=\\\"changeGroup\\\" type=\\\"button\\\" id=\\\"2-\" + element['numStudent'] + \"\\\">2</button>\";\n      newChangeGroup.innerHTML = newChangeGroup.innerHTML + \"<button class=\\\"changeGroup\\\" type=\\\"button\\\" id=\\\"3-\" + element['numStudent'] + \"\\\">3</button>\";\n      newChangeGroup.innerHTML = newChangeGroup.innerHTML + \"<button class=\\\"changeGroup\\\" type=\\\"button\\\" id=\\\"4-\" + element['numStudent'] + \"\\\">4</button>\";\n      newChangeGroup.innerHTML = newChangeGroup.innerHTML + \"<button class=\\\"changeGroup\\\" type=\\\"button\\\" id=\\\"5-\" + element['numStudent'] + \"\\\">5</button>\";\n      newChangeGroup.innerHTML = newChangeGroup.innerHTML + \"<button class=\\\"changeGroup\\\" type=\\\"button\\\" id=\\\"6-\" + element['numStudent'] + \"\\\">6</button>\";\n      linesArray.push(newLine);\n      numCells.push(newNumberCell);\n      nameCells.push(newNameCell);\n      firstnameCells.push(newFirstnameCell);\n    }\n  });\n  const groupsButtons = document.getElementsByClassName('changeGroup');\n  Array.prototype.forEach.call(groupsButtons, function (element) {\n    element.onclick = function () {\n      changeElementGroup(this);\n    };\n  });\n}\n\nconst changeElementGroup = async element => {\n  //Extraire numéro de groupe\n  const numGrp = parseInt(element.id[0]); //Extraire numéro d'étudiant\n\n  const numEtudiant = parseInt(element.id.substring(2, element.id.length)); //Récupérer l'étudiant correspondant\n\n  const requestOption = {\n    method: 'GET'\n  };\n  const response = await fetch('http://127.0.0.1:3000/groups/all', requestOption);\n  const students = await response.json();\n  var findedStudent = null;\n  students.forEach(parentElement => {\n    const element = parentElement['student'];\n\n    if (element['numStudent'] == numEtudiant) {\n      findedStudent = element;\n    }\n  }); //Supprimer l'ancienne entrée du groupe\n\n  await removeInGroup(groupNumber, findedStudent); //Ajouter la nouvelle entrée\n\n  const newStudentInGroup = {\n    numGroup: numGrp,\n    student: findedStudent\n  };\n  const bodyContent = JSON.stringify(newStudentInGroup);\n  const requestOptions = {\n    method: 'POST',\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: bodyContent\n  };\n  const response2 = await fetch('http://localhost:3000/groups/add', requestOptions); //Mise à jour de la table\n\n  allStudents();\n};\n\nconst removeInGroup = async (numGroupToRemove, studentToRemove) => {\n  const newStudentInGroup = {\n    numGroup: numGroupToRemove,\n    student: studentToRemove\n  }; // body is built from created student\n\n  const bodyContent2 = JSON.stringify(newStudentInGroup); // options for a POST method that conains json\n\n  const requestOptions2 = {\n    method: 'POST',\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: bodyContent2\n  }; // send the request to the server to create the entry corresponding to book\n\n  const response2 = await fetch('http://localhost:3000/groups/remove', requestOptions2);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9zcmMvc2NyaXB0cy9ncm91cHMuanM/ZDhkMiJdLCJuYW1lcyI6WyJncm91cE51bWJlciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhc2tBZnRlckxvYWRpbmciLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwib25jbGljayIsImNoYW5nZUdyb3VwIiwiYWxsU3R1ZGVudHMiLCJlbGVtZW50IiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZXF1ZXN0T3B0aW9uIiwibWV0aG9kIiwicmVzcG9uc2UiLCJmZXRjaCIsInN0dWRlbnRzIiwianNvbiIsImZpbGxTdHVkZW50TGlzdCIsInN0dWRlbnRzSnNvbiIsInRhYmxlIiwibGluZXNBcnJheSIsIm51bUNlbGxzIiwibmFtZUNlbGxzIiwiZmlyc3RuYW1lQ2VsbHMiLCJmb3JFYWNoIiwicGFyZW50RWxlbWVudCIsIm5ld0xpbmUiLCJpbnNlcnRSb3ciLCJuZXdOdW1iZXJDZWxsIiwiaW5zZXJ0Q2VsbCIsIm5ld05hbWVDZWxsIiwibmV3Rmlyc3RuYW1lQ2VsbCIsIm5ld0NoYW5nZUdyb3VwIiwicHVzaCIsImdyb3Vwc0J1dHRvbnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwiY2hhbmdlRWxlbWVudEdyb3VwIiwibnVtR3JwIiwiaWQiLCJudW1FdHVkaWFudCIsInN1YnN0cmluZyIsImxlbmd0aCIsImZpbmRlZFN0dWRlbnQiLCJyZW1vdmVJbkdyb3VwIiwibmV3U3R1ZGVudEluR3JvdXAiLCJudW1Hcm91cCIsInN0dWRlbnQiLCJib2R5Q29udGVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXF1ZXN0T3B0aW9ucyIsImhlYWRlcnMiLCJib2R5IiwicmVzcG9uc2UyIiwibnVtR3JvdXBUb1JlbW92ZSIsInN0dWRlbnRUb1JlbW92ZSIsImJvZHlDb250ZW50MiIsInJlcXVlc3RPcHRp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YyxHQUF2QjtBQUtBLFFBQU1NLFNBQVMsR0FBRyxNQUFNMUMsS0FBSyxDQUFDLGtDQUFELEVBQXFDdUMsY0FBckMsQ0FBN0IsQ0E3QndDLENBOEJ4Qzs7QUFDQS9DLEVBQUFBLFdBQVc7QUFDaEIsQ0FoQ0Q7O0FBa0NBLE1BQU13QyxhQUFhLEdBQ2pCLE9BQU9XLGdCQUFQLEVBQXlCQyxlQUF6QixLQUE2QztBQUMzQyxRQUFNWCxpQkFBaUIsR0FBRztBQUN4QkMsSUFBQUEsUUFBUSxFQUFHUyxnQkFEYTtBQUV4QlIsSUFBQUEsT0FBTyxFQUFHUztBQUZjLEdBQTFCLENBRDJDLENBSzNDOztBQUNBLFFBQU1DLFlBQVksR0FBR1IsSUFBSSxDQUFDQyxTQUFMLENBQWVMLGlCQUFmLENBQXJCLENBTjJDLENBTzNDOztBQUNBLFFBQU1hLGVBQWUsR0FBRztBQUN0QmhELElBQUFBLE1BQU0sRUFBRSxNQURjO0FBRXRCMEMsSUFBQUEsT0FBTyxFQUFHO0FBQUUsc0JBQWdCO0FBQWxCLEtBRlk7QUFHdEJDLElBQUFBLElBQUksRUFBR0k7QUFIZSxHQUF4QixDQVIyQyxDQWEzQzs7QUFDQSxRQUFNSCxTQUFTLEdBQUcsTUFBTTFDLEtBQUssQ0FBQyxxQ0FBRCxFQUF3QzhDLGVBQXhDLENBQTdCO0FBQ0QsQ0FoQkgiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ3JvdXBOdW1iZXIgPSAwO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGFza0FmdGVyTG9hZGluZyk7XG5cbmZ1bmN0aW9uIGFza0FmdGVyTG9hZGluZygpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnMCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgY2hhbmdlR3JvdXAodGhpcyk7IH07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzEnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IGNoYW5nZUdyb3VwKHRoaXMpOyB9O1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcyJykub25jbGljayA9IGZ1bmN0aW9uKCkgeyBjaGFuZ2VHcm91cCh0aGlzKTsgfTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnMycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgY2hhbmdlR3JvdXAodGhpcyk7IH07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IGNoYW5nZUdyb3VwKHRoaXMpOyB9O1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCc1Jykub25jbGljayA9IGZ1bmN0aW9uKCkgeyBjaGFuZ2VHcm91cCh0aGlzKTsgfTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnNicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgY2hhbmdlR3JvdXAodGhpcyk7IH07XG4gICAgYWxsU3R1ZGVudHMoKTtcbn1cblxuZnVuY3Rpb24gY2hhbmdlR3JvdXAoZWxlbWVudCkge1xuICAgIGdyb3VwTnVtYmVyID0gcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgIGlmKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpICE9ICcwJykge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKS5pbm5lckhUTUwgPSBcIkdyb3VwZSBcIiArIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJykuaW5uZXJIVE1MID0gXCJBdWN1biBncm91cGVcIjtcbiAgICB9XG4gICAgYWxsU3R1ZGVudHMoKTtcbn1cblxuY29uc3QgYWxsU3R1ZGVudHMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbiA9ICB7bWV0aG9kOidHRVQnfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjMwMDAvZ3JvdXBzL2FsbCcsIHJlcXVlc3RPcHRpb24pO1xuICAgIGNvbnN0IHN0dWRlbnRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGZpbGxTdHVkZW50TGlzdChzdHVkZW50cyk7XG59XG5cbmZ1bmN0aW9uIGZpbGxTdHVkZW50TGlzdChzdHVkZW50c0pzb24pIHtcbiAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheUdyb3VwXCIpO1xuICAgIHRhYmxlLmlubmVySFRNTCA9IFwiPHRyPiA8dGg+TnVtw6lybzwvdGg+IDx0aD5Ob208L3RoPiA8dGg+UHLDqW5vbTwvdGg+IDwvdHI+XCI7XG5cbiAgICBjb25zdCBsaW5lc0FycmF5ID0gW107XG4gICAgY29uc3QgbnVtQ2VsbHMgPSBbXTtcbiAgICBjb25zdCBuYW1lQ2VsbHMgPSBbXTtcbiAgICBjb25zdCBmaXJzdG5hbWVDZWxscyA9IFtdO1xuXG4gICAgc3R1ZGVudHNKc29uLmZvckVhY2gocGFyZW50RWxlbWVudCA9PiB7XG4gICAgICAgIGlmKHBhcmVudEVsZW1lbnRbJ251bUdyb3VwJ10gPT0gZ3JvdXBOdW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50WydzdHVkZW50J11cblxuICAgICAgICAgICAgY29uc3QgbmV3TGluZSA9IHRhYmxlLmluc2VydFJvdygpO1xuICAgICAgICAgICAgY29uc3QgbmV3TnVtYmVyQ2VsbCA9IG5ld0xpbmUuaW5zZXJ0Q2VsbCgwKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld05hbWVDZWxsID0gbmV3TGluZS5pbnNlcnRDZWxsKDEpO1xuICAgICAgICAgICAgY29uc3QgbmV3Rmlyc3RuYW1lQ2VsbCA9IG5ld0xpbmUuaW5zZXJ0Q2VsbCgyKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0NoYW5nZUdyb3VwID0gbmV3TGluZS5pbnNlcnRDZWxsKDMpO1xuXG4gICAgICAgICAgICBuZXdOdW1iZXJDZWxsLmlubmVySFRNTCA9IGVsZW1lbnRbJ251bVN0dWRlbnQnXTtcbiAgICAgICAgICAgIG5ld05hbWVDZWxsLmlubmVySFRNTCA9IGVsZW1lbnRbJ25hbWUnXTtcbiAgICAgICAgICAgIG5ld0ZpcnN0bmFtZUNlbGwuaW5uZXJIVE1MID0gZWxlbWVudFsnZmlyc3RuYW1lcyddO1xuXG4gICAgICAgICAgICBuZXdDaGFuZ2VHcm91cC5pbm5lckhUTUwgPSBcIjxidXR0b24gY2xhc3M9XFxcImNoYW5nZUdyb3VwXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCIwLVwiICsgZWxlbWVudFsnbnVtU3R1ZGVudCddICsgXCJcXFwiPjA8L2J1dHRvbj5cIjtcbiAgICAgICAgICAgIG5ld0NoYW5nZUdyb3VwLmlubmVySFRNTCA9IG5ld0NoYW5nZUdyb3VwLmlubmVySFRNTCArIFwiPGJ1dHRvbiBjbGFzcz1cXFwiY2hhbmdlR3JvdXBcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcIjEtXCIgKyBlbGVtZW50WydudW1TdHVkZW50J10gKyBcIlxcXCI+MTwvYnV0dG9uPlwiO1xuICAgICAgICAgICAgbmV3Q2hhbmdlR3JvdXAuaW5uZXJIVE1MID0gbmV3Q2hhbmdlR3JvdXAuaW5uZXJIVE1MICsgXCI8YnV0dG9uIGNsYXNzPVxcXCJjaGFuZ2VHcm91cFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwiMi1cIiArIGVsZW1lbnRbJ251bVN0dWRlbnQnXSArIFwiXFxcIj4yPC9idXR0b24+XCI7XG4gICAgICAgICAgICBuZXdDaGFuZ2VHcm91cC5pbm5lckhUTUwgPSBuZXdDaGFuZ2VHcm91cC5pbm5lckhUTUwgKyBcIjxidXR0b24gY2xhc3M9XFxcImNoYW5nZUdyb3VwXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCIzLVwiICsgZWxlbWVudFsnbnVtU3R1ZGVudCddICsgXCJcXFwiPjM8L2J1dHRvbj5cIjtcbiAgICAgICAgICAgIG5ld0NoYW5nZUdyb3VwLmlubmVySFRNTCA9IG5ld0NoYW5nZUdyb3VwLmlubmVySFRNTCArIFwiPGJ1dHRvbiBjbGFzcz1cXFwiY2hhbmdlR3JvdXBcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcIjQtXCIgKyBlbGVtZW50WydudW1TdHVkZW50J10gKyBcIlxcXCI+NDwvYnV0dG9uPlwiO1xuICAgICAgICAgICAgbmV3Q2hhbmdlR3JvdXAuaW5uZXJIVE1MID0gbmV3Q2hhbmdlR3JvdXAuaW5uZXJIVE1MICsgXCI8YnV0dG9uIGNsYXNzPVxcXCJjaGFuZ2VHcm91cFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwiNS1cIiArIGVsZW1lbnRbJ251bVN0dWRlbnQnXSArIFwiXFxcIj41PC9idXR0b24+XCI7XG4gICAgICAgICAgICBuZXdDaGFuZ2VHcm91cC5pbm5lckhUTUwgPSBuZXdDaGFuZ2VHcm91cC5pbm5lckhUTUwgKyBcIjxidXR0b24gY2xhc3M9XFxcImNoYW5nZUdyb3VwXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCI2LVwiICsgZWxlbWVudFsnbnVtU3R1ZGVudCddICsgXCJcXFwiPjY8L2J1dHRvbj5cIjtcblxuICAgICAgICAgICAgbGluZXNBcnJheS5wdXNoKG5ld0xpbmUpO1xuICAgICAgICAgICAgbnVtQ2VsbHMucHVzaChuZXdOdW1iZXJDZWxsKTtcbiAgICAgICAgICAgIG5hbWVDZWxscy5wdXNoKG5ld05hbWVDZWxsKTtcbiAgICAgICAgICAgIGZpcnN0bmFtZUNlbGxzLnB1c2gobmV3Rmlyc3RuYW1lQ2VsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGdyb3Vwc0J1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjaGFuZ2VHcm91cCcpO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZ3JvdXBzQnV0dG9ucywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgY2hhbmdlRWxlbWVudEdyb3VwKHRoaXMpOyB9O1xuICAgIH0pO1xufVxuXG5jb25zdCBjaGFuZ2VFbGVtZW50R3JvdXAgPSBhc3luYyAoZWxlbWVudCkgPT4ge1xuICAgIC8vRXh0cmFpcmUgbnVtw6lybyBkZSBncm91cGVcbiAgICBjb25zdCBudW1HcnAgPSBwYXJzZUludChlbGVtZW50LmlkWzBdKTtcbiAgICAvL0V4dHJhaXJlIG51bcOpcm8gZCfDqXR1ZGlhbnRcbiAgICBjb25zdCBudW1FdHVkaWFudCA9IHBhcnNlSW50KGVsZW1lbnQuaWQuc3Vic3RyaW5nKDIsIGVsZW1lbnQuaWQubGVuZ3RoKSk7XG4gICAgLy9Sw6ljdXDDqXJlciBsJ8OpdHVkaWFudCBjb3JyZXNwb25kYW50XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbiA9ICB7bWV0aG9kOidHRVQnfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjMwMDAvZ3JvdXBzL2FsbCcsIHJlcXVlc3RPcHRpb24pO1xuICAgIGNvbnN0IHN0dWRlbnRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHZhciBmaW5kZWRTdHVkZW50ID0gbnVsbDtcbiAgICBzdHVkZW50cy5mb3JFYWNoKHBhcmVudEVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gcGFyZW50RWxlbWVudFsnc3R1ZGVudCddXG4gICAgICAgIGlmKGVsZW1lbnRbJ251bVN0dWRlbnQnXSA9PSBudW1FdHVkaWFudCkge1xuICAgICAgICAgICAgZmluZGVkU3R1ZGVudCA9IGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvL1N1cHByaW1lciBsJ2FuY2llbm5lIGVudHLDqWUgZHUgZ3JvdXBlXG4gICAgYXdhaXQgcmVtb3ZlSW5Hcm91cChncm91cE51bWJlciwgZmluZGVkU3R1ZGVudCk7XG4gICAgLy9Bam91dGVyIGxhIG5vdXZlbGxlIGVudHLDqWVcbiAgICBjb25zdCBuZXdTdHVkZW50SW5Hcm91cCA9IHtcbiAgICAgICAgbnVtR3JvdXAgOiBudW1HcnAsXG4gICAgICAgIHN0dWRlbnQgOiBmaW5kZWRTdHVkZW50LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGJvZHlDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkobmV3U3R1ZGVudEluR3JvdXApO1xuICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZCA6J1BPU1QnLFxuICAgICAgICBoZWFkZXJzIDogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBib2R5IDogYm9keUNvbnRlbnRcbiAgICAgIH07XG4gICAgICBjb25zdCByZXNwb25zZTIgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2dyb3Vwcy9hZGQnLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICAvL01pc2Ugw6Agam91ciBkZSBsYSB0YWJsZVxuICAgICAgYWxsU3R1ZGVudHMoKTtcbn1cblxuY29uc3QgcmVtb3ZlSW5Hcm91cCA9XG4gIGFzeW5jIChudW1Hcm91cFRvUmVtb3ZlLCBzdHVkZW50VG9SZW1vdmUpID0+IHtcbiAgICBjb25zdCBuZXdTdHVkZW50SW5Hcm91cCA9IHtcbiAgICAgIG51bUdyb3VwIDogbnVtR3JvdXBUb1JlbW92ZSxcbiAgICAgIHN0dWRlbnQgOiBzdHVkZW50VG9SZW1vdmUsXG4gICAgfTtcbiAgICAvLyBib2R5IGlzIGJ1aWx0IGZyb20gY3JlYXRlZCBzdHVkZW50XG4gICAgY29uc3QgYm9keUNvbnRlbnQyID0gSlNPTi5zdHJpbmdpZnkobmV3U3R1ZGVudEluR3JvdXApO1xuICAgIC8vIG9wdGlvbnMgZm9yIGEgUE9TVCBtZXRob2QgdGhhdCBjb25haW5zIGpzb25cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczIgPSB7XG4gICAgICBtZXRob2QgOidQT1NUJyxcbiAgICAgIGhlYWRlcnMgOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5IDogYm9keUNvbnRlbnQyXG4gICAgfTtcbiAgICAvLyBzZW5kIHRoZSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdG8gY3JlYXRlIHRoZSBlbnRyeSBjb3JyZXNwb25kaW5nIHRvIGJvb2tcbiAgICBjb25zdCByZXNwb25zZTIgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2dyb3Vwcy9yZW1vdmUnLCByZXF1ZXN0T3B0aW9uczIpO1xuICB9Il0sImZpbGUiOiIuL3NyYy9zY3JpcHRzL2dyb3Vwcy5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/groups.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/groups.js"]();
/******/ 	
/******/ })()
;