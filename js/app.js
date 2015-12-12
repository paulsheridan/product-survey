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
var products = [];

function ProductBox (imageName){
  this.imageName = imageName;
  this.productName;
  this.filePath;
  this.voteTotal = 0;
}

ProductBox.prototype.imagePath = function(name){
  this.filePath = "img/" + name;
  this.productName = name.slice(0, -4);
}

function generateProducts (){
  for (var i = 0; i < images.length; i++){
    products[i] = new ProductBox (images[i]);
    products[i].imagePath(products[i].imageName);
    console.log(products[i])
  }
}
generateProducts();
