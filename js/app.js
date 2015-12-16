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
var barData = {
  labels : [],
  datasets : [
    {
      fillColor : "#48A497",
      strokeColor : "#48A4D1",
      data : []
    },
    {
      fillColor : "rgba(73,188,170,0.4)",
      strokeColor : "rgba(72,174,209,0.4)",
      data : []
    }
  ]
}

function Product (name, path){
  this.name = name;
  this.path = path;
  this.voteTotal = 0;
  this.displayTotal = 0;
}

(function makeProducts (){
  for (var i = 0; i < images.length; i++){
    allProducts.push(new Product(images[i].slice(0, -4), "img/" + images[i]));
  }
})();

var tracker = {
  left: '',
  right: '',
  totalVotes: 0,
  voteBox: document.getElementById("vote-box"),
  totalsButton: document.getElementById("see-totals"),
  totalEl: document.getElementById("totals"),
  product1: document.getElementById("choice-one"),
  product2: document.getElementById("choice-two"),
  product3: document.getElementById("choice-three"),

  randomNumber: function(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  },

  generateChoices: function(){
    do {
      tracker.product1 = allProducts[tracker.randomNumber(0, allProducts.length)];
      tracker.product2 = allProducts[tracker.randomNumber(0, allProducts.length)];
      tracker.product3 = allProducts[tracker.randomNumber(0, allProducts.length)];
    } while (tracker.product1 === tracker.product2 || tracker.product1 === tracker.product3 || tracker.product2 === tracker.product3);

    document.getElementById("choice-one").src = tracker.product1.path;
    tracker.product1.displayTotal += 1;
    document.getElementById("choice-two").src = tracker.product2.path;
    tracker.product2.displayTotal += 1;
    document.getElementById("choice-three").src = tracker.product3.path;
    tracker.product3.displayTotal += 1;

    if (tracker.totalVotes > 1 && tracker.totalVotes % 15 === 0){
      tracker.totalsButton.hidden = false;
    } else {
      tracker.totalsButton.hidden = true;
    }
  },

  addTotalVote: function(productNumber){
    productNumber.voteTotal += 1;
    tracker.totalVotes += 1;
    tracker.generateChoices();
  }
}

function compare(a,b) {
  if (a.voteTotal > b.voteTotal)
  return -1;
  if (a.voteTotal < b.voteTotal)
  return 1;
  return 0;
}

tracker.totalsButton.addEventListener("click", function(event){
  allProducts.sort(compare);
  for (var i = 0; i < allProducts.length; i++){
    barData.labels[i] = (allProducts[i].name);
    barData.datasets[0].data[i] = (Math.floor((allProducts[i].voteTotal / tracker.totalVotes) * 100));
    barData.datasets[1].data[i] = (Math.floor((allProducts[i].voteTotal / allProducts[i].displayTotal) * 100));
  }
  var chart = document.getElementById("canvas").getContext("2d");
  new Chart(chart).Bar(barData);
});

tracker.voteBox.addEventListener("click", function(event){
  if (event.target.id === "choice-one"){
    tracker.addTotalVote(tracker.product1);
  } else if (event.target.id === "choice-two"){
    tracker.addTotalVote(tracker.product2);
  } else if (event.target.id === "choice-three"){
    tracker.addTotalVote(tracker.product3);
  }
});
tracker.generateChoices();
