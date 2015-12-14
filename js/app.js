var product1;
var product2;
var product3;
var products = [];
var totalVotes = 0;
var voteBox = document.getElementById("vote-box");
var totalsButton = document.getElementById("see-totals");
var totalEl = document.getElementById("totals");
var images = [
  "bag.jpg",
  "boots.jpg",
  "cthulhu.jpg",
  "pen.jpg",
  "shark.jpg",
  "unicorn.jpg",
  "water_can.jpg",
  "banana.jpg",
  "chair.jpg",
  "dragon.jpg",
  "scissors.jpg",
  "sweep.png",
  "usb.gif",
  "wine_glass.jpg"
];

function ProductBox (imageName){
  this.imageName = imageName;
  this.voteTotal = 0;
  this.productName;
  this.filePath;
}

ProductBox.prototype.imagePath = function (name){
  this.filePath = "img/" + name;
  this.productName = name.slice(0, -4);
}

function popProducts (){
  for (var i = 0; i < images.length; i++){
    products[i] = new ProductBox (images[i]);
    products[i].imagePath(products[i].imageName);
  }
}

function randNum (min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateNew (){
  while (totalEl.firstChild) {
    totalEl.removeChild(totalEl.firstChild);
  }
  var totVotes = document.getElementById("tot-votes");
  totVotes.textContent = "You've voted " + totalVotes + " times.";
  product1 = products[randNum(0, products.length)];
  product2 = products[randNum(0, products.length)];
  product3 = products[randNum(0, products.length)];
  while (product1 === product2 || product1 === product3){
    product1 = products[randNum(0, products.length)];
  }
  while (product2 === product3){
    product2 = products[randNum(0, products.length)];
  }
  var imgOne = document.getElementById("choice-one");
  imgOne.src = product1.filePath;
  var imgTwo = document.getElementById("choice-two");
  imgTwo.src = product2.filePath;
  var imgThree = document.getElementById("choice-three");
  imgThree.src = product3.filePath;
  if (totalVotes > 1 && totalVotes % 15 === 0){
    totalsButton.disabled = false;
  } else {
    totalsButton.disabled = true;
  }
}

function addVote (id){
  if (id === "choice-one"){
    product1.voteTotal += 1;
    totalVotes += 1;
    console.log("One vote for " + product1.productName);
    generateNew();
  } else if (id === "choice-two"){
    product2.voteTotal += 1;
    totalVotes += 1;
    console.log("One vote for " + product2.productName);
    generateNew();
  } else if (id === "choice-three"){
    product3.voteTotal += 1;
    totalVotes += 1;
    console.log("One vote for " + product3.productName);
    generateNew();
  } else {
    console.log("That's not a product!");
  }
}

totalsButton.addEventListener("click", function(event){
  products.sort(compare);
  var headArr = ["Product", "Votes", "Percentage"];
  var tblEl = document.createElement("table");
  for (var i = 0; i < headArr.length; i++){
    var thEl = document.createElement("th");
    thEl.textContent = headArr[i];
    tblEl.appendChild(thEl);
  }
  for (var i = 0; i < products.length; i++){
    trEl = document.createElement("tr");
    var valArr = [];
    valArr.push(products[i].productName, products[i].voteTotal + " Votes", Math.floor((products[i].voteTotal / totalVotes) * 100) + "%");
    for (var j = 0; j < valArr.length; j++){
      tdEl = document.createElement("td");
      tdEl.textContent = valArr[j];
      trEl.appendChild(tdEl);
      tblEl.appendChild(trEl);
    }
  }
  totalEl.appendChild(tblEl);
});

voteBox.addEventListener("click", function(event){
  addVote(event.target.id);
});

function compare(a,b) {
  if (a.voteTotal > b.voteTotal)
    return -1;
  if (a.voteTotal < b.voteTotal)
    return 1;
  return 0;
}

popProducts();
generateNew();
