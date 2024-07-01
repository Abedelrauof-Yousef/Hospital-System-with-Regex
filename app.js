let form = document.getElementById("form");

function Person(
  fullName,
  password,
  date,
  gender,
  phone,
  chronicDiseases,
  imageURL
) {
  this.fullName = fullName;
  this.password = password;
  this.date = date;
  this.gender = gender;
  this.phone = phone;
  this.chronicDiseases = chronicDiseases;
  this.imageURL = imageURL;
}

function validateForm(fullName, password, date, email, phone) {
  const usernameRegex = /^\S+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^07\d{8}$/;

  if (!usernameRegex.test(fullName)) {
    alert("Username must not contain spaces.");
    return false;
  }
  if (!passwordRegex.test(password)) {
    alert("Password must be at least 8 characters long, contain at least one number, one uppercase letter, and one special character.");
    return false;
  }
  if (!dateRegex.test(date)) {
    alert("Birthday must be in the format YYYY-MM-DD.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Email must be in a valid format.");
    return false;
  }
  if (!phoneRegex.test(phone)) {
    alert("Phone number must be 10 digits long and start with 07.");
    return false;
  }
  return true;
}

function render(event) {
  event.preventDefault();
  let fullName = document.getElementById("fullName").value;
  let password = document.getElementById("password").value;
  let date = document.getElementById("date").value;
  let email = document.getElementById("email").value;
  let gender = document.getElementById("gender").value;
  let phone = document.getElementById("phone").value;
  let chronicDiseases = document.getElementById("chronicDiseases").value;
  let imageURL = gender == "male" ? "male.jpg" : "female.png";

  if (!validateForm(fullName, password, date, email, phone)) {
    return;
  }

  let person = new Person(
    fullName,
    password,
    date,
    gender,
    phone,
    chronicDiseases,
    imageURL
  );
  let patientData =
    localStorage.getItem("Patient") == null
      ? []
      : JSON.parse(localStorage.getItem("Patient"));

  patientData.push(person);

  localStorage.setItem("Patient", JSON.stringify(patientData));
  location.reload();
}
form.addEventListener("submit", render);

function display() {
  let data = JSON.parse(localStorage.getItem("Patient"));
  data.forEach((element) => {
    let patient = new Person(
      element.fullName,
      element.password,
      element.date,
      element.gender,
      element.phone,
      element.chronicDiseases,
      element.imageURL
    );
    
    let div = document.createElement("div");
    let img = document.createElement("img");
    let scrollable = document.getElementById("scrollableDiv");
    img.src = patient.imageURL;
    let cardContent = document.createElement("div");
    let fullNameh4 = document.createElement("h4");
    let passwordh4 = document.createElement("h4");
    let dateh4 = document.createElement("h4");
    let genderh4 = document.createElement("h4");
    let phoneh4 = document.createElement("h4");
    let chronicDiseasesh4 = document.createElement("h4");
    fullNameh4.innerText = patient.fullName;
    passwordh4.innerText = patient.password;
    dateh4.innerText = patient.date;
    genderh4.innerText = patient.gender;
    phoneh4.innerText = patient.phone;
    chronicDiseasesh4.innerText = patient.chronicDiseases;
    cardContent.appendChild(fullNameh4);
    cardContent.appendChild(passwordh4);
    cardContent.appendChild(dateh4);
    cardContent.appendChild(genderh4);
    cardContent.appendChild(phoneh4);
    cardContent.appendChild(chronicDiseasesh4);
    div.appendChild(img);
    div.appendChild(cardContent);
    scrollable.appendChild(div);
  });
}
display();
