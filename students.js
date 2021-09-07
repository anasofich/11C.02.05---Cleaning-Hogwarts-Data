"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

const Student = {
  firstName: "",
  middleName: "",
  nickName: "",
  lastName: "",
  image: "",
  house: "",
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareStudents(jsonData);
    });
}

//FIRST VERSION

/* function prepareStudents(jsonData) {
  jsonData.forEach((jsonObject) => {
    const student = Object.create(Student);

    const fullName = jsonObject.fullname.trim();
    const firstSpace = fullName.indexOf(" ");
    const lastSpace = fullName.lastIndexOf(" ");

    //getting each name separetely
    const firstName = fullName.substring(0, firstSpace);
    const middleName = fullName.substring(firstSpace + 1, lastSpace);
    const lastName = fullName.substring(lastSpace + 1);

    //making the first letter cap
    const firstNameCap = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
    const middleNameCap = middleName.substring(0, 1).toUpperCase() + middleName.substring(1).toLowerCase();
    const lastNameCap = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();

    //now the house
    const house = jsonObject.house.trim();

    //making house cap
    const houseCap = house.substring(0, 1).toUpperCase() + house.substring(1).toLowerCase();

    student.firstName = firstNameCap;
    student.middleName = middleNameCap;
    student.lastName = lastNameCap;
    student.house = houseCap;

    allStudents.push(student);

    console.table(student);
  });
} */

//SECOND VERSION

function prepareStudents(jsonData) {
  jsonData.forEach((jsonObject) => {
    // console.log("prepareStudents: ");
    // console.log(jsonObject);
    const student = Object.create(Student);
    student.firstName = getFirstName(jsonObject.fullname.trim());
    student.middleName = getMiddleName(jsonObject.fullname.trim());
    student.nickName = getNickName(jsonObject.fullname.trim());
    student.lastName = getLastName(jsonObject.fullname.trim());
    student.image = getImage(student.lastName, student.firstName);
    student.house = getHouseName(jsonObject.house.trim());
    allStudents.push(student);
  });
  console.table(allStudents);
}

function getFirstName(fullname) {
  //console.log(getFirstName);
  if (fullname.includes(" ") == true) {
    const firstName = fullname.slice(0, fullname.indexOf(" "));
    const cleanFirstName = cleanName(firstName);
    return cleanFirstName;
  } else {
    const cleanFirstName = cleanName(fullname);
    return cleanFirstName;
  }
}

function getLastName(fullname) {
  //console.log(getLastName);
  if (fullname.includes(" ") == true) {
    const lastName = fullname.slice(fullname.lastIndexOf(" ") + 1);
    const cleanLastName = cleanName(lastName);
    return cleanLastName;
  }
  return undefined;
}

function getMiddleName(fullname) {
  //console.log(getMiddleName);
  if (fullname.includes(" ") == true) {
    const middleSpace = fullname.slice(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
    const firstCharacter = middleSpace.slice(0, 1);
    if (firstCharacter !== '"') {
      const cleanMiddleName = cleanName(middleSpace);
      return cleanMiddleName;
    }
  }
}

function getNickName(fullname) {
  //console.log(getNickName);
  const middleSpace = fullname.slice(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
  const firstCharacter = middleSpace.slice(0, 1);
  if (firstCharacter === '"') {
    const length = middleSpace.length;
    const nickNameWithoutQuotes = middleSpace.slice(1, length - 1);
    const cleanNickName = cleanName(nickNameWithoutQuotes);
    return cleanNickName;
  }
}

function getHouseName(house) {
  //console.log(getHouseName);
  const cleanHouse = cleanName(house);
  return cleanHouse;
}

function getImage(lastname, firstname) {
  //console.log(getImage);
  if (lastname !== undefined) {
    const smallLastName = lastname.toLowerCase();
    const smallFirstName = firstname.toLowerCase();
    const firstLetterOfFirstName = firstname.slice(0, 1).toLowerCase();
    if (lastname == "Patil") {
      const imageSrc = `${smallLastName}_${smallFirstName}.png`;
      return imageSrc;
    } else if (lastname.includes("-") == true) {
      const partOfLastNameAfterHyphen = lastname.slice(lastname.indexOf("-") + 1);
      const imageSrc = `${partOfLastNameAfterHyphen}_${firstLetterOfFirstName}.png`;
      return imageSrc;
    } else {
      const imageSrc = `${smallLastName}_${firstLetterOfFirstName}.png`;
      return imageSrc;
    }
  }
}

function cleanName(name) {
  const firstLetter = name.slice(0, 1).toUpperCase();
  const restOfName = name.slice(1).toLowerCase();
  const cleanName = firstLetter + restOfName;
  return cleanName;
}
