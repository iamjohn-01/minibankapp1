let currentUser = null;

// LOAD USERS
function getUsers(){
  return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(users){
  localStorage.setItem("users", JSON.stringify(users));
}

// SHOW BALANCE + HISTORY
function updateUI(){
  let users = getUsers();

  document.getElementById("balance").innerText =
    "₦" + users[currentUser].balance;

  renderHistory(users[currentUser].history || []);
}

// CREATE ACCOUNT
function createAccount(){
  let user = document.getElementById("newUser").value;
  let pass = document.getElementById("newPass").value;

  let users = getUsers();

  if(users[user]) return alert("User exists");

  users[user] = {
    password: pass,
    balance: 0,
    history: []
  };

  saveUsers(users);
  alert("Account created");
  showLogin();
}

// LOGIN
function login(){
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let users = getUsers();

  if(users[user] && users[user].password === pass){
    currentUser = user;

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("currentUser").innerText = user;

    updateUI();
  } else {
    alert("Invalid login");
  }
}

// DEPOSIT
function deposit(){
  let amount = Number(document.getElementById("amount").value);
  let users = getUsers();

  if(amount <= 0) return;

  users[currentUser].balance += amount;

  users[currentUser].history.push(
    `Deposited ₦${amount}`
  );

  saveUsers(users);
  updateUI();
}

// WITHDRAW
function withdraw(){
  let amount = Number(document.getElementById("amount").value);
  let users = getUsers();

  if(amount <= 0) return;

  if(users[currentUser].balance >= amount){
    users[currentUser].balance -= amount;

    users[currentUser].history.push(
      `Withdrew ₦${amount}`
    );

    saveUsers(users);
    updateUI();
  } else {
    alert("Insufficient funds");
  }
}

// TRANSFER 💸
function transfer(){
  let toUser = document.getElementById("transferTo").value.trim();
  let amount = Number(document.getElementById("transferAmount").value);

  let users = getUsers();

  // 🔥 normalize usernames (VERY IMPORTANT)
  let sender = currentUser;

  if(!toUser || !amount){
    return alert("Fill all fields");
  }

  if(!users[toUser]){
    return alert("Recipient user not found");
  }

  if(users[sender].balance < amount){
    return alert("Insufficient balance");
  }

  // 💸 deduct sender
  users[sender].balance -= amount;

  // 💰 credit receiver
  users[toUser].balance += amount;

  // 🧾 logs
  if(!users[sender].history) users[sender].history = [];
  if(!users[toUser].history) users[toUser].history = [];

  users[sender].history.push(`Sent ₦${amount} to ${toUser}`);
  users[toUser].history.push(`Received ₦${amount} from ${sender}`);

  // 💾 SAVE FIRST (very important)
  saveUsers(users);

  // 🔄 refresh UI
  updateUI();

  alert("Transfer successful");
}
  }

  // deduct sender
  users[currentUser].balance -= amount;

  // add receiver
  users[toUser].balance += amount;

  // history logs
  users[currentUser].history.push(
    `Sent ₦${amount} to ${toUser}`
  );

  users[toUser].history.push(
    `Received ₦${amount} from ${currentUser}`
  );

  saveUsers(users);
  updateUI();
}

// RENDER HISTORY
function renderHistory(history){
  let box = document.getElementById("historyBox");
  box.innerHTML = "";

  history.slice().reverse().forEach(item => {
    let div = document.createElement("div");
    div.innerText = item;
    box.appendChild(div);
  });
}

// LOGOUT
function logout(){
  currentUser = null;

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}
