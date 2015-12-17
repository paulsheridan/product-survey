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
  ]
}

var radarData = {
  labels: [],
  datasets: [
    {
      label: "Percentage of Total Votes",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: []
    },
    {
      label: "Percentage of Votes per View",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: []
    }
  ]
};

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
    if (tracker.totalVotes < 15){
      buttonHandler.totalsButton.hidden = true;
      tracker.voteBox.addEventListener("click", tracker.voteBoxEvent);
    } else {
      buttonHandler.totalsButton.hidden = false;
      buttonHandler.totalsButton.addEventListener("click", tracker.makeTable);
      tracker.voteBox.removeEventListener("click", tracker.voteBoxEvent);
    }
  },

  addTotalVote: function(productNumber){
    productNumber.voteTotal += 1;
    tracker.totalVotes += 1;
    localStorage.setItem(productNumber.name, JSON.stringify(productNumber));
    tracker.generateChoices();
  },

  importJson: function(){
    for (var i = 0; i < allProducts.length; i++){
      var getJson = localStorage.getItem(allProducts[i].name);
      if (getJson !== null){
        var parsedObj = JSON.parse(getJson);
        allProducts[i].voteTotal += parsedObj.voteTotal;
        allProducts[i].displayTotal += parsedObj.displayTotal;
      }
    }
  },

  makeTable: function (){
    allProducts.sort(compare);
    for (var i = 0; i < allProducts.length; i++){
      barData.labels[i] = (allProducts[i].name);
      radarData.labels[i] = (allProducts[i].name);
      barData.datasets[0].data[i] = allProducts[i].voteTotal;
      radarData.datasets[0].data[i] = (Math.floor((allProducts[i].voteTotal / tracker.totalVotes) * 100));
      radarData.datasets[1].data[i] = (Math.floor((allProducts[i].voteTotal / allProducts[i].displayTotal) * 100));
    }
    buttonHandler.switchTables();
    buttonHandler.totalsButton.hidden = true;
  },

  voteBoxEvent: function() {
    if (event.target.id === "choice-one"){
      tracker.addTotalVote(tracker.product1);
    } else if (event.target.id === "choice-two"){
      tracker.addTotalVote(tracker.product2);
    } else if (event.target.id === "choice-three"){
      tracker.addTotalVote(tracker.product3);
    }
  }
}

var buttonHandler = {
  totalsButton: document.getElementById("see-totals"),
  changeGraph: document.getElementById("change-graph"),
  resetLocal: document.getElementById("reset-local"),
  tableState: "bar",

  switchTables: function(){
    var container = document.getElementById("chart-container");
    while (container.firstChild){
      container.removeChild(container.firstChild);
    }
    var newCanvas = document.createElement("canvas");
    container.appendChild(newCanvas).setAttribute("class", "twelve columns");
    var chart = newCanvas.getContext("2d");
    if(this.tableState === "bar"){
      var radarChart = new Chart(chart).Radar(radarData);
      this.tableState = "radar";
    } else {
      var barChart = new Chart(chart).Bar(barData);
      this.tableState = "bar";
    }
    buttonHandler.changeGraph.addEventListener("click", this.switchTables);
  }
}

function compare(a,b) {
  if (a.voteTotal > b.voteTotal)
  return -1;
  if (a.voteTotal < b.voteTotal)
  return 1;
  return 0;
}
buttonHandler.resetLocal.addEventListener("click", localStorage.clear());
window.onload = tracker.importJson();
tracker.generateChoices();
