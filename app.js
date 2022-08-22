let kittens = []

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5,
  }
  let kittenName = form.name.value
  if (kittens.some(kitten => kitten.name == kittenName)) {alert("You already have this kitten")}
  if (kittenName =="") {alert("All Kittens Have Names")}
  else {
  kittens.push(kitten)
  saveKittens()
  drawKittens()
  form.reset()
}
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if(storedKittens){
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens()
  
  let kittenListElement = document.getElementById("kitten-list")
  let kittensTemplate = ""
  
  kittens.forEach(kitten => {
    kittensTemplate += `
   <div class = "cat-card bg-dark text-light kitten ${kitten.mood}">
      <img class="kitten" src="http://placekitten.com/200/300" alt="">
      <h1 class="text-center ">${kitten.name}</h1>
      <h3 class="text-center">${kitten.mood}</h3>
      
      <div class="d-flex space-around">
        <button onclick="pet('${kitten.id}')">Love On</button>
        <button onclick="catnip('${kitten.id}')">Catnip</button>
        <button class="btn-cancel" onclick="removeKitten('${kitten.id}')">Set Free</button>
        </div>
    </div>  
    `
  })
  kittenListElement.innerHTML = kittensTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id);
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let catPet =Math.random()
  if (catPet > .5){
    currentKitten.affection ++;
    setKittenMood(currentKitten)
    saveKittens()
  }
  if (catPet <= .5){
    currentKitten.affection --;
    setKittenMood(currentKitten)
    saveKittens()
  }
 
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "tolerant";
  currentKitten.affection = 5;
  saveKittens()
  drawKittens()
  
  
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  document.getElementById("kitten-list").classList.remove(kitten.mood)
  if (kitten.affection >= 6) {kitten.mood = "happy"}
  if (kitten.affection == 5) {kitten.mood = "tolerant"}
  if (kitten.affection <=4) {kitten.mood = "angry"}
  if (kitten.affection <= 0) {kitten.mood = "gone"}
  document.getElementById("kitten-list").classList.add(kitten.mood)
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.splice(0, kittens.length)
  saveKittens()
}

function removeKitten(id){
  let index=kittens.findIndex(kitten => kitten.id == id)
  
  kittens.splice(index, 1)
  saveKittens()

}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  
  console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();

