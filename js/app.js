var product1;
var product2;
var product3;
var products = [];
var voteBox = document.getElementById("vote-box");
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
}

function addVote (id){
  if (id === "choice-one"){
    product1.voteTotal += 1;
    console.log("One vote for " + product1.productName)
    generateNew();
  } else if (id === "choice-two"){
    product2.voteTotal += 1;
    console.log("One vote for " + product2.productName)
    generateNew();
  } else if (id === "choice-three"){
    product3.voteTotal += 1;
    console.log("One vote for " + product3.productName)
    generateNew();
  } else {
    console.log("That's not a product!")
  }
}

voteBox.addEventListener('click', function(event){
  addVote(event.target.id);
});

popProducts();
generateNew();
