let currentUser = null;

// SHOW PAGES
function showCreate(){
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("createBox").style.display = "block";
}

function showLogin(){
  document.getElementById("createBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// CREATE ACCOUNT
function createAccount(){
  let user = document.getElementById("newUser").value;
  let pass = document.getElementById("newPass").value;

  if(!user || !pass){
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if(users[user]){
    alert("User already exists");
    return;
  }

  users[user] = {
    password: pass,
    balance: 0
  };

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created!");
  showLogin();
}

// LOGIN
function login(){
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if(users[user] && users[user].password === pass){
    currentUser = user;

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("currentUser").innerText = user;

    updateBalance();
  } else {
    alert("Invalid login");
  }
}

// UPDATE BALANCE DISPLAY
function updateBalance(){
  let users = JSON.parse(localStorage.getItem("users"));
  document.getElementById("balance").innerText =
    "₦" + users[currentUser].balance;
}

// DEPOSIT
function deposit(){
  let amount = Number(document.getElementById("amount").value);
  if(amount <= 0) return;

  let users = JSON.parse(localStorage.getItem("users"));

  users[currentUser].balance += amount;

  localStorage.setItem("users", JSON.stringify(users));

  updateBalance();
}

// WITHDRAW
function withdraw(){
  let amount = Number(document.getElementById("amount").value);
  let users = JSON.parse(localStorage.getItem("users"));

  if(amount <= 0) return;

  if(users[currentUser].balance >= amount){
    users[currentUser].balance -= amount;
    localStorage.setItem("users", JSON.stringify(users));
    updateBalance();
  } else {
    alert("Insufficient funds");
  }
}

// LOGOUT
function logout(){
  currentUser = null;

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}
