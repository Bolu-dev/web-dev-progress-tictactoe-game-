//logics for configuration
//func for opening config
function openPlayerConfig(event) {
  // to know the id(num) of the player we're currently editing
  editedPlayer = +event.target.dataset.playerid; //this will hold a vlaue of 1 or 2
  //the + converts the string to a number.
  configOverlay.style.display = "block";
  backdropElement.style.display = "block";
}

//function for closing config
function closeConfig() {
  configOverlay.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorOutput.textContent = "";
  //to clear the input field
  formElement.firstElementChild.lastElementChild.value = "";
}

//submitevent func that saves player name
function savePlayerConfig(event) {
  event.preventDefault(); //prevents the browser default behaviour of sending a req automatically
  const formData = new FormData(event.target); //to target our form
  //by using the event.target, JS will automatically look for inputs that have a name field
  const enteredPlayername = formData.get("playername").trim(); //to extract the name entered in our form
  //we're accessing the value in our formdata with help of the value we've defined
  //in our "name" attribute in the input of pour HTMl
  //.trim() get rids of excess whitespace: '   Max Max    '=>'Max Max'
  console.log(enteredPlayername);
  //adding a validation
  if (!enteredPlayername) {
    // enteredPlayername === ''=>empty string
    event.target.firstElementChild.classList.add("error");
    errorOutput.textContent = "Please eneter a valid name!😒";
    return;
  }

  const updatedPlayerData = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerData.children[2].textContent = enteredPlayername;
  //to check and store the updated player name to the players[arr] we're currently editing
  //since player[array] needs an index(0 or 1), it is easier to write like this
  players[editedPlayer - 1].name = enteredPlayername;
  closeConfig();
}
