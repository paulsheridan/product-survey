var product1;
var product2;
var product3;
var totalVotes = 0;
var voteBox = document.getElementById("vote-box");
var totalsButton = document.getElementById("see-totals");
var totalEl = document.getElementById("totals");
var allProducts = [];
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

function Product (imageName){
  this.imageName = imageName;
  this.voteTotal = 0;
  this.displayTotal = 0;
  this.filePath;
  this.productName;
}

Product.prototype.imagePath = function (name){
  this.filePath = "img/" + name;
  this.productName = name.slice(0, -4);
}

function popProducts (){
  for (var i = 0; i < images.length; i++){
    allProducts[i] = new Product (images[i]);
    allProducts[i].imagePath(allProducts[i].imageName);
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
  var imgOne = document.getElementById("choice-one");
  var imgTwo = document.getElementById("choice-two");
  var imgThree = document.getElementById("choice-three");

  totVotes.textContent = "You've voted " + totalVotes + " times.";

  product1 = allProducts[randNum(0, allProducts.length)];
  product2 = allProducts[randNum(0, allProducts.length)];
  product3 = allProducts[randNum(0, allProducts.length)];
  while (product1 === product2 || product1 === product3){
    product1 = allProducts[randNum(0, allProducts.length)];
  }
  while (product2 === product3){
    product2 = allProducts[randNum(0, allProducts.length)];
  }

  imgOne.src = product1.filePath;
  product1.displayTotal += 1;
  imgTwo.src = product2.filePath;
  product2.displayTotal += 1;
  imgThree.src = product3.filePath;
  product3.displayTotal += 1;

  if (totalVotes > 1 && totalVotes % 15 === 0){
    totalsButton.hidden = false;
  } else {
    totalsButton.hidden = true;
  }
}

totalsButton.addEventListener("click", function(event){
  allProducts.sort(compare);
  var headArr = ["Product", "Votes", "Views", "Percentage", "% Per View"];
  var tblEl = document.createElement("table");
  for (var i = 0; i < headArr.length; i++){
    var thEl = document.createElement("th");
    thEl.textContent = headArr[i];
    tblEl.appendChild(thEl);
  }
  for (var i = 0; i < allProducts.length; i++){
    trEl = document.createElement("tr");
    var valArr = [];
    valArr.push(
      allProducts[i].productName,
      allProducts[i].voteTotal + " Votes",
      allProducts[i].displayTotal + " Views",
      Math.floor((allProducts[i].voteTotal / totalVotes) * 100) + "%",
      Math.floor((allProducts[i].voteTotal / allProducts[i].displayTotal) * 100) + "%"
    );
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
  if (event.target.id === "choice-one"){
    product1.voteTotal += 1;
    totalVotes += 1;
  } else if (event.target.id === "choice-two"){
    product2.voteTotal += 1;
    totalVotes += 1;
  } else if (event.target.id === "choice-three"){
    product3.voteTotal += 1;
    totalVotes += 1;
  }
  generateNew();
});

function compare(a,b) {
  if (a.voteTotal > b.voteTotal)
    return -1;
  if (a.voteTotal < b.voteTotal)
    return 1;
  return 0;
}


var myChart = document.getElementById("myChart").getContext("2d");
new Chart(myChart).Bar(barData);
var barData = {
	labels : ["January","February","March","April","May","June"],
	datasets : [
		{
			fillColor : "#48A497",
			strokeColor : "#48A4D1",
			data : [456,479,324,569,702,600]
		},
		{
			fillColor : "rgba(73,188,170,0.4)",
			strokeColor : "rgba(72,174,209,0.4)",
			data : [364,504,605,400,345,320]
		}

	]
}

popProducts();
generateNew();
