var product1;
var product2;
var product3;
var products = [];
var idOne = document.getElementById("id-one");
var idTwo = document.getElementById("id-two");
var idThree = document.getElementById("id-three");
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
  this.productName;
  this.filePath;
  this.voteTotal = 0;
}

ProductBox.prototype.imagePath = function (name){
  this.filePath = "img/" + name;
  this.productName = name.slice(0, -4);
}

function makeProducts (){
  for (var i = 0; i < images.length; i++){
    products[i] = new ProductBox (images[i]);
    products[i].imagePath(products[i].imageName);
  }
}
makeProducts();

function randNum (min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateChoices (){
  product1 = products[randNum(0, products.length)];
  product2 = products[randNum(0, products.length)];
  product3 = products[randNum(0, products.length)];
  while (product1 === product2 || product1 === product3){
    product1 = products[randNum(0, products.length)];
  }
  while (product2 === product3){
    product2 = products[randNum(0, products.length)];
  }
  imgOne = document.createElement("img");
  imgOne.src = product1.filePath;
  idOne.appendChild(imgOne);

}
generateChoices();
