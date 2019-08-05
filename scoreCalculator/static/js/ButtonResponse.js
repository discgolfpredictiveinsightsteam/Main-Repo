
document.getElementById("button").addEventListener("click", function(event){
  event.preventDefault();
  respond_to_button();
});

function respond_to_button() {
  console.log("Your button is reacting");
  var userSelectedPlayer1 = d3.select("#Player1Input").node().value;
  var userSelectedPlayer2 = d3.select("#Player2Input").node().value;
  var userSelectedCourse = d3.select("#CourseInput").node().value;
  var userSelectedDateTime = d3.select("#DateTimeInput").node().value;
  console.log(userSelectedPlayer1);
  console.log(userSelectedPlayer2);
  console.log(userSelectedCourse);
  console.log(userSelectedDateTime);

  
  giveodds(userSelectedPlayer1, userSelectedPlayer2, userSelectedCourse, userSelectedDateTime);
  predictweather(userSelectedCourse, userSelectedDateTime);
  careerstats(userSelectedPlayer1, userSelectedPlayer2);
  coursedisplay(userSelectedCourse);
};




function coursedisplay(choice) {
    console.log("Course Display is in play");
    console.log(choice);
    if (choice == 0) {
      document.getElementById('JumboTronBro').innerHTML="<img src=../static/src/san_francisco_cropped.jpg>";
    }
    else if (choice == 1) {
      document.getElementById('JumboTronBro').innerHTML="<img src=../static/src/aquatic_park_cropped.jpg>";
    }
    else {
      document.getElementById('JumboTronBro').innerHTML="<img src=../static/src/chabot_cropped.jpg>"
    }
  }


function predictweather(course, date) {
// console.log("Weather Predictor is in play");
var weather_fetch_url = `/weather/${course}/${date}`;
d3.json(weather_fetch_url).then(function(weatheroutput) {
  // console.log(weatheroutput);
  var winddirection = weatheroutput[0];
  var maxgust = weatheroutput[1];
  var precip = weatheroutput[2];

  // Need to create bins that will convert the degrees into a bearing.
  if (winddirection < 30) {
    bearing = "North " + "(" + winddirection + "º" + ")";
  }
  else if (winddirection < 60) {
    bearing = "North-West " + "(" + winddirection + "º" + ")";
  }
  else if (winddirection < 120) {
    bearing = "South " + "(" + winddirection + "º" + ")";
  }
  else if (winddirection < 150) {
    bearing = "South-West " + "(" + winddirection + "º" + ")";
  }
  else if (winddirection < 210) {
    bearing = "South  " + "(" + winddirection + "º" + ")";
  }
  else if (winddirection < 240) {
    bearing = "South-East  " + "(" + winddirection + "º" + ")";
  }
  else if (winddirection < 300) {
    bearing = "East " + "(" + winddirection + "º" + ")";
  }
  else if (winddirection < 330) {
    bearing = "North-East " + "(" + winddirection + "º" + ")";
  }
  else {
    bearing = "North " + "(" + winddirection + "º" + ")";
  }

  // console.log(bearing);

  var windspeedselected = d3.select("#PredictedWeather");
  var row = windspeedselected.append("tr");
  var cell = windspeedselected.append("td");

  windspeedselected.html("");

  var row = windspeedselected.append("tr");
  var cell = windspeedselected.append("td");
  cell.text(bearing);
  var cell = windspeedselected.append("td");
  cell.text(maxgust + " mph");
  var cell = windspeedselected.append("td");
  cell.text(precip + " inches of rain");
  row.text("");

  console.log("PredictWeather() fully operational");
})
};

function careerstats(guy1, guy2) {
  
  array1 = []
  array2 = []
  array3 = []
  array4 = []
  array5 = []
  array1b = []
  array2b = []
  array3b = []
  array4b = []
  array5b = []
  
  
  array1.length = 0
  array2.length = 0
  array3.length = 0
  array4.length = 0
  array5.length = 0
  array1b.length = 0
  array2b.length = 0
  array3b.length = 0
  array4b.length = 0
  array5b.length = 0


  console.log("Player 1 & 2 stats is in play");
    var career_fetch_url = `/stats/${guy1}/${guy2}`;
    d3.json(career_fetch_url).then(function(careerscores) {
    //  console.log(careerscores);
      
      var p1Ngames = careerscores[0].length;
      var p2Ngames = careerscores[1].length;
      var sum1 = 0;
      var sum2 = 0;
      var firstZero = "0";


      if (p1Ngames < 8 || p2Ngames < 8) {
        modelWeak();
      }


// Once we isolate the 5th value of each array...
// The task is to add zeroes to each array of length 12,
// Then add zeroes to each array of length 13,
// Then replace the slashes with dashes at preordained indices 



// 4 passes. Pass 1: add a 0 to the beginning of arrays with length 12.

      for (var i = 0; i < careerscores[0].length; i++){
        var entry1 = careerscores[0][i];

        subarray1 = [];
        subarray2 = [];
        subarray3 = [];
        subarray4 = [];


        
        for (var j = 0; j < entry1.length; j++) {
          if (j % 6 == 4) {
          var itema = entry1[j];
          // console.log(itema.length)
          // console.log(itema);
          if (itema.length === 12) {
            itemb = itema.slice(0, 2) + "0" + itema.slice(2);
            subarray1.push(itemb);
          }
          else {
            subarray1.push(itema);
          }
          // console.log(subarray1);
          array1.push(subarray1);
        }
      };
      
    };
    // console.log(array1);

      for (var j = 0; j < array1.length; j++) {
          var itemc = array1[j][0];
          // console.log(itemc.length);
          // console.log(itemc);
          if (itemc.length === 13) {
            if (itemc[1] == "/"){
              itemd = firstZero + itemc;
              // console.log(itemd);
              subarray2.push(itemd);
            }
            else {
              iteme = itemc.slice(0, 3) + "0" + itemc.slice(3);
              // console.log(iteme);
              subarray2.push(iteme);
            }
          }
          else {
            // console.log(itemc);
            subarray2.push(itemc);
          }
          array2.push(subarray2);
        }
      // console.log(array2[0]);


      for (var j = 0; j<array2[0].length; j++) {
        itemf = array2[0][j];
        itemg = itemf.replace(/\//g, "-");
        itemh = itemg + ":00";
        array3.push(itemh);
      }
    //  console.log(array3);
      
      for (var j = 0; j<array3.length; j++) {
        itemi = array3[j];
        itemj = itemi.slice(6, 8) + "-" + itemi.slice(0, 5) + " " + itemi.slice(9);
        // console.log(itemi);
        // console.log(itemj);
        itemk = "20" + itemj;
      //  console.log(itemk);
        array4.push(itemk);
      };

      for (var i = 0; i < careerscores[0].length; i++){
          var scorea = careerscores[0][i];
          for (var j = 0; j < scorea.length; j++)
            if (j % 6 == 1) {
            var itemi = scorea[j];
            subarray3.push(itemi);
          }
        array5.push(subarray3);
        };

        console.log(array5);

        // REPEAT

        for (var i = 0; i < careerscores[1].length; i++){
          var entry2 = careerscores[1][i];
  
          subarray1b = [];
          subarray2b = [];
          subarray3b = [];
          subarray4b = [];
  
  
          
          for (var j = 0; j < entry2.length; j++) {
            if (j % 6 == 4) {
            var itemab = entry2[j];
            // console.log(itema.length)
            // console.log(itema);
            if (itemab.length === 12) {
              itembb = itemab.slice(0, 2) + "0" + itemab.slice(2);
              subarray1b.push(itembb);
            }
            else {
              subarray1b.push(itemab);
            }
            // console.log(subarray1);
            array1b.push(subarray1b);
          }
        };
        
      };
      // console.log(array1);
  
        for (var j = 0; j < array1b.length; j++) {
            var itemcb = array1b[j][0];
            // console.log(itemc.length);
            // console.log(itemc);
            if (itemcb.length === 13) {
              if (itemcb[1] == "/"){
                itemdb = firstZero + itemcb;
                // console.log(itemd);
                subarray2b.push(itemdb);
              }
              else {
                itemeb = itemcb.slice(0, 3) + "0" + itemcb.slice(3);
                // console.log(iteme);
                subarray2b.push(itemeb);
              }
            }
            else {
              // console.log(itemc);
              subarray2b.push(itemcb);
            }
            array2b.push(subarray2b);
          }
        // console.log(array2[0]);
  
  
        for (var j = 0; j<array2b[0].length; j++) {
          itemfb = array2b[0][j];
          itemgb = itemfb.replace(/\//g, "-");
          itemhb = itemgb + ":00";
          array3b.push(itemhb);
        }
      //  console.log(array3b);
        
        for (var j = 0; j<array3b.length; j++) {
          itemib = array3b[j];
          itemjb = itemib.slice(6, 8) + "-" + itemib.slice(0, 5) + " " + itemib.slice(9);
          // console.log(itemi);
          // console.log(itemj);
          itemkb = "20" + itemjb;
        //  console.log(itemkb);
          array4b.push(itemkb);
        };
  
        for (var i = 0; i < careerscores[1].length; i++){
            var scoreab = careerscores[1][i];
            for (var j = 0; j < scoreab.length; j++)
              if (j % 6 == 1) {
              var itemib = scoreab[j];
              subarray3b.push(itemib);
            }
          array5b.push(subarray3b);
          };
          
        //  console.log(array5b);
          
      var data1 = [
        {
          type: "scatter",
          mode: "markers",
          x: array4,
          y: array5[0],
          marker: {
            color: 'green'
          }
        }
      ];

      var layout1 = {
        title: guy1 + " Recorded Scores",
        yaxis: {
          title: 'Points',
        },
        xaxis: {
          title: 'Date',
        }
      }

      var data2 = [
        {
          type: "scatter",
          mode: "markers",
          x: array4b,
          y: array5b[0],
          marker: {
            color: 'red'
          }
        }
      ];

      var layout2 = {
        title: guy2 + " Recorded Scores",
        yaxis: {
          title: 'Points',
        },
        xaxis: {
          title: 'Date',
        }
      }

      var trace3 =
        {
          y: array5[0],
          boxpoints: 'all',
          jitter: 0.3,
          poitpos: -1.8,
          type: 'box',
          marker: {
            color: 'green'
          }
        }
      ;

      var layout3 = {
        title: 'Relative Distributions',
        yaxis: {
          title: 'Points'
        },
        showlegend: false 
      }

      var trace4 =
        {
          y: array5b[0],
          boxpoints: 'all',
          jitter: 0.3,
          poitpos: -1.8,
          type: 'box',
          marker: {
            color: 'red'
          }
        }
      ;

      var layout4 = {
        title: 'Score Dist',
        yaxis: {
          title: 'Points'
        }
      }

      var data3 = [trace3,trace4]





      Plotly.newPlot("lineplot1", data1, layout1);
      Plotly.newPlot("lineplot2", data2, layout2);
      Plotly.newPlot("boxplot1", data3, layout3);
      // Plotly.newPlot("boxplot2", data4, layout4);
      
      

      d3.select("Counta").append("h6").text(p1Ngames);
      
      array6 = array5[0];
      array7 = array6.map(Number);

      array6b = array5b[0];
      array7b = array6b.map(Number);

      console.log(array7);


      var P1N = array5[0].length;
      var P2N = array5b[0].length;
      

      function mean(numbers) {
        // mean of [3, 5, 4, 4, 1, 1, 2, 3] is 2.875
        var total = 0,
            i;
        for (i = 0; i < numbers.length; i += 1) {
            total += numbers[i];
        }
        return total / numbers.length;
    }

      var P1Mean = mean(array7);
      console.log(P1Mean);
      var P2Mean = mean(array7b);
      console.log(P2Mean);      

      console.log(P1N);
      console.log(P2N);





      var P1StDev = variance(array7);
      var P2StDev = variance(array7b)
      console.log(P1StDev);
      console.log(P2StDev);

      var tbodysummary1 = d3.select("#ASummary");
      
      tbodysummary1.html("");
      
      var row1 = tbodysummary1.append("tr");
      var cell1 = tbodysummary1.append("td");
      cell1.text(P1N);
      var cell1 = tbodysummary1.append("td");
      cell1.text(P1Mean);
      var cell1 = tbodysummary1.append("td");
      cell1.text(P1StDev);

      var tbodysummary2 = d3.select("#BSummary");

      tbodysummary2.html("");

      var row2 = tbodysummary2.append("tr");
      var cell = tbodysummary2.append("td");
      cell.text(P2StDev);
      var cell = tbodysummary2.append("td");
      cell.text(P2Mean);
      var cell = tbodysummary2.append("td");
      cell.text(P2N);
      
      row1.text("");
      row2.text("");
    })};
      
// Still need N, Mean, and SD
  

// if (no course history but odds being predicted there) warningMessage2();





function giveodds(player1, player2, course, date) {
  console.log("giveodds is in play");
  var data_fetch_url = `/score_model/${player1}/${player2}/${course}/${date}`;
  d3.json(data_fetch_url).then(function(data) {
      console.log(data);
      // Grab values from the response json object to build the plots
      var score1 = data[0];
      var score2 = data[1];
      var oddsscore = data[2];

      console.log(score1);
      console.log(score2);
      console.log(oddsscore);

var tbodyodds = d3.select("#Odds");
var row = tbodyodds.append("tr");
var cell = tbodyodds.append("td");

tbodyodds.html("");

var row = tbodyodds.append("tr");
var cell = tbodyodds.append("td");
cell.text(player1);
var cell = tbodyodds.append("td");
cell.text(score1);
var cell = tbodyodds.append("td");
cell.text(oddsscore);
var cell = tbodyodds.append("td");
cell.text(score2);
var cell = tbodyodds.append("td");
cell.text(player2);

row.text("");
  });
}

function isNum(args)
{
args = args.toString();
if (args.length == 0) return false;
for (var i = 0; i<args.length; i++)
{
if ((args.substring(i,i+1) < "0" || args.substring(i, i+1) > "9") && args.substring(i, i+1) != "."&& args.substring(i, i+1) != "-")
{
return false;
}
}
return true;
}
//calculate the mean of a number array
function mean(arr)
{
var len = 0;
var sum = 0;
for(var i=0;i<arr.length;i++)
{
if (arr[i] == ""){}
else if (!isNum(arr[i]))
{
alert(arr[i] + " is not number!");
return;
}
else
{
len = len + 1;
sum = sum + parseFloat(arr[i]);
}
}
return sum / len;
}


function variance(arr)
{
var len = 0;
var sum=0;
for(var i=0;i<arr.length;i++)
{
if (arr[i] == ""){}
else if (!isNum(arr[i]))
{
alert(arr[i] + " is not number, Variance Calculation failed!");
return 0;
}
else
{
len = len + 1;
sum = sum + parseFloat(arr[i]);
}
}
var v = 0;
if (len > 1)
{
var mean = sum / len;
for(var i=0;i<arr.length;i++)
{
if (arr[i] == ""){}
else
{
v = v + (arr[i] - mean) * (arr[i] - mean);
}
}
return v / len;
}
else
{
return 0;
}
};



function modelWeak() {
  alert("One or more of the players you have selected has fewer than 8 games! Thus, the model may be less robust.");
}



  

      // var mergedarray1 = [].concat.apply([], array1);
      // var mergedarray2 = [].concat.apply([], array2);
      // var mergedarray3 = [].concat.apply([], array3);

      
      
      // console.log(mergedarray3);
    
      // for(var i=0; i<mergedarray1.length;i++) mergedarray1[i] = parseInt(mergedarray1[i], 10);
      // for(var i=0; i<mergedarray2.length;i++) mergedarray2[i] = parseInt(mergedarray2[i], 10);
    
      // var stdev1 = standardDeviation(mergedarray1);
      // var stdev2 = standardDeviation(mergedarray2);

      // var mergedarray3 = [].concat.apply([], array3);
      // for(var i=0; i<mergedarray3.length;i++) mergedarray3[i] = parseInt(mergedarray3[i], 10);

      // console.log(mergedarray3)
      // console.log(stdev1);
      // console.log(stdev2);

      // need to change the slashes to dashes.

      // N is p1Ngames and p2Ngames
      // M is p1mean and p2mean
      // SD is stdev1 and stdev2 



      // data1 = [trace1];
      

// Must add in seconds to each time point.
// Must have each datapoint as a single concat'd array.
    //if (p1Ngames < 8 || p2Ngames < 8) warningMessage();