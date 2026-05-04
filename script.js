let balance = 0;

function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if(user && pass) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    alert("Enter login details");
  }
}

function addMoney() {
  balance += 10000;
  document.getElementById("balance").innerText = "₦" + balance;
}

function logout() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}
