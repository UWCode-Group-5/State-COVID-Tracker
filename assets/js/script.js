// Setting up moment.js
var today = moment();

// Setup values
var stateSubmit = $("#state-submit");
var clearSubmit = $("#clear-submit");
$("#datepicker").datepicker({ dateFormat: 'yymmdd' });

// Setting up Current Chart.js
function chartCurrent(response) {
  var canvasOne = $("<canvas id='myChartOne'></canvas>");
  var chartContainer1 = $(".chartContainer1");
  chartContainer1.empty();
  chartContainer1.append(canvasOne);

  var myChartOne = $("#myChartOne")[0].getContext("2d");
  var currentChart;
  currentChart = new Chart(myChartOne, {
    type: "bar",
    data: {
      labels: ["death", "hospitalized", "positiveIncrease", "negativeIncrease"],
      datasets: [{
        label: "Current Covid Statistics",
        data: [
          response.death,
          response.hospitalized,
          response.positiveIncrease,
          response.negativeIncrease,
        ],
        backgroundColor: [
          "#7f0000",
          "#ce93d8",
          "#ef9a9a",
          "#a5d6a7",
          "#ef5350",
          "#66bb6a"
        ]
      }]
    },

    options: {}
  });
}

// Setting up Historic Chart.js
function chartHistoric(responseTwo) {
  var canvasTwo = $("<canvas id='myChartTwo'></canvas>");
  var chartContainer2 = $(".chartContainer2");
  chartContainer2.empty();
  chartContainer2.append(canvasTwo);
  var myChartTwo = $("#myChartTwo")[0].getContext("2d");
  var historicChart;
  historicChart = new Chart(myChartTwo, {
    type: "bar",
    data: {
      labels: ["death", "hospitalized", "positiveIncrease", "negativeIncrease"],
      datasets: [{
        label: "Historic Covid Statistics",
        data: [
          responseTwo.death,
          responseTwo.hospitalized,
          responseTwo.positiveIncrease,
          responseTwo.negativeIncrease,
        ],
        backgroundColor: [
          "#7f0000",
          "#ce93d8",
          "#ef9a9a",
          "#a5d6a7",
          "#ef5350",
          "#66bb6a"
        ]
      }]
    },
    options: {}
  });

}

// Current Data Container
var container = $("#container");
var date = $("<h3>");
var state = $("<h3>");
var death = $("<h3>");
var hospitalized = $("<h3>");
var positive = $("<h3>");
var negative = $("<h3>");
var positiveIncrease = $("<h3>");
var negativeIncrease = $("<h3>");
var dataQualityGrade = $("<h3>");

//Historic Data Container
var containerTwo = $("#container-two");
var dateTwo = $("<h3>");
var stateTwo = $("<h3>");
var deathTwo = $("<h3>");
var hospitalizedTwo = $("<h3>");
var positiveTwo = $("<h3>");
var negativeTwo = $("<h3>");
var positiveIncreaseTwo = $("<h3>");
var negativeIncreaseTwo = $("<h3>");
var dataQualityGradeTwo = $("<h3>");

// Append Current Items
function appendCurrent() {
  container.append(
    date,
    state,
    death,
    hospitalized,
    positive,
    negative,
    positiveIncrease,
    negativeIncrease,
    dataQualityGrade);
}

//Append Historic Items
function appendHistoric() {
  containerTwo.append(
    dateTwo,
    stateTwo,
    deathTwo,
    hospitalizedTwo,
    positiveTwo,
    negativeTwo,
    positiveIncreaseTwo,
    negativeIncreaseTwo,
    dataQualityGradeTwo);
}

// Empty Values
function removeItems() {
  // Clear Current Values
  date = date.text(" ");
  state = state.text(" ");
  death = death.text(" ");
  hospitalized = hospitalized.text(" ");
  positive = positive.text(" ");
  negative = negative.text(" ");
  positiveIncrease = positiveIncrease.text(" ");
  negativeIncrease = negativeIncrease.text(" ");
  dataQualityGrade = dataQualityGrade.text(" ");

  //Clear Historic Values
  dateTwo = dateTwo.text(" ");
  stateTwo = stateTwo.text(" ");
  deathTwo = deathTwo.text(" ");
  hospitalizedTwo = hospitalizedTwo.text(" ");
  positiveTwo = positiveTwo.text(" ");
  negativeTwo = negativeTwo.text(" ");
  positiveIncreaseTwo = positiveIncreaseTwo.text(" ");
  negativeIncreaseTwo = negativeIncreaseTwo.text(" ");
  dataQualityGradeTwo = dataQualityGradeTwo.text(" ");
}
var states = $("#user-search").val();


// Call API's
function handleAPI() {
  var states = $("#user-search").val();
  var queryURL =
    "https://api.covidtracking.com/v1/states/" + states + "/current.json";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Ajax Call for Searched Current Values
    date.text("Date: " + moment.format("MMMM Do YYYY"));
    state.text("State: " + response.state);
    death.text("Covid State Deaths: " + response.death);
    hospitalized.text("Covid Hospitalizations: " + response.hospitalized);
    positive.text("Covid Positive Cases: " + response.positive);
    negative.text("Covid Negative Cases: " + response.negative);
    positiveIncrease.text(
      "Covid Positive Case Increase: " + response.positiveIncrease
    );
    negativeIncrease.text(
      "Covid Negative Case Increase: " + response.negativeIncrease
    );
    dataQualityGrade.text(
      "Data Quality Grade: " + response.dataQualityGrade
    );
    appendCurrent(response);
    chartCurrent(response);

    //Ajax call for Searched Historic Values
    var dates = $("#datepicker").datepicker({ dateFormat: 'yymmdd' }).val();
    var queryURL =
      "https://api.covidtracking.com/v1/states/" +
      states +
      "/" +
      dates +
      ".json";
    if (dates == "") {
      return
    } else {
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (responseTwo) {
        console.log(responseTwo);
        dateTwo.text("Date: " + responseTwo.date);
        stateTwo.text("State: " + responseTwo.state);
        deathTwo.text("Covid State Deaths: " + responseTwo.death);
        hospitalizedTwo.text("Covid Hospitalizations: " + responseTwo.hospitalized);
        positiveTwo.text("Covid Positive Cases: " + responseTwo.positive);
        negativeTwo.text("Covid Negative Cases: " + responseTwo.negative);
        positiveIncreaseTwo.text(
          "Covid Positive Case Increase: " + responseTwo.positiveIncrease
        );
        negativeIncreaseTwo.text(
          "Covid Negative Case Increase: " + responseTwo.negativeIncrease
        );
        dataQualityGradeTwo.text(
          "Data Qualtiy Grade: " + responseTwo.dataQualityGrade
        );
        appendHistoric();
        chartHistoric(responseTwo);
      });
    }
  });
}

//News Handler Variables

var newsContainerEl = $("#newsContainer");
var title = $("<h2>");
var link = $("<a>");

// // News Handler
function newsHandler() {
  var queryURL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=coronavirus&api-key=nWRIeVDQlH0DflGm5L1S9D7a8GPZU7WJ";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

    var resTitle = response.response.docs[0].headline.main;
    var title0 = response.response.docs[0].headline.main;
    var link0 = response.response.docs[0].web_url;
    var articleArray = response.response;

    for (var i = 0; i < 5; i++) {

      var article;
      var unOrderList = $("#newsArticles");
      var link;
      var linki = response.response.docs[i].web_url;
      article = $('<li class="is-size-5" style= "list-style:none;"> ');
      link = $("<a>");
      link.text(response.response.docs[i].headline.main);
      link.attr("href", linki)
      article.append(link);
      unOrderList.append(article);
    }

    var articleArray = response.response;
    var article;
    var unOrderList = $('.marque-content-items');
        for (var i=0; i<5;i++){
          article = $('<li>');
          article.text(response.response.docs[i].headline.main);
          unOrderList.append(article);
        }

  });
}

// Append Current Items
function appendNews() {
  newsContainerEl.append(
    title,

    link
  );
}

// Appending and Calling NewsAPI
appendNews();
newsHandler();

// Calling and Rendering Current and Historic API
stateSubmit.on("click", function (event) {
  event.preventDefault();
  handleAPI();
  console.log(states);

});

//save to local Storage
// function saveLastState(){

// }



// savedDataArray=[];
// var savedDataKey = "savedDataKey";
// //save to LS


// var saveData = document.getElementById("statesubmit");
// statesubmit.addEventListener("click", function (e) {


//  statepicker = document.getElementById("statepicker").value;
//   console.log("ihello");
  
//   savedDataArray.push({ state, date});
//   console.log(savedDataArray);
//   //savedDataString= JSON.stringify(savedDataArray);

//   //localStorage.setItem(savedDataKey, savedDataString);


// });


// Clear Current and Historic API
clearSubmit.on("click", function (event) {
    event.preventDefault();
    removeItems();
  });

