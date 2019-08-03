document.getElementById("button").addEventListener("click", function(event){
  event.preventDefault();
  respond_to_button();
});


function Collapser() {
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
}

Collapser();

// $(document).ready(function() {
//     $('#button').on('click', function(event) {
//         event.preventDefault();
//         console.log("Button is reacting");
//         respond_to_button();
//     });
// });

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
};

  // coursedisplay(userSelectedCourse);
  // player1stats(userSelectedPlayer1, userSelectedCourse);
  // player2stats(userSelectedPlayer2, userSelectedCourse);

// function coursedisplay() {
//   console.log("Course Display is in play");


// }


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

      array1 = [];

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
        }
      ];

      var layout1 = {
        title: guy1 + ' Recorded Scores',
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
        }
      ];

      var layout2 = {
        title: guy2 + ' Recorded Scores',
        yaxis: {
          title: 'Points',
        },
        xaxis: {
          title: 'Date',
        }
      }

      var data3 = [
        {
          y: array5[0],
          boxpoints: 'all',
          jitter: 0.3,
          poitpos: -1.8,
          type: 'box'
        }
      ];

      var layout3 = {
        title: '1-D Distribution of scores',
        yaxis: {
          title: 'Points'
        }
      }

      var data4 = [
        {
          y: array5b[0],
          boxpoints: 'all',
          jitter: 0.3,
          poitpos: -1.8,
          type: 'box'
        }
      ];

      var layout4 = {
        title: '1-D Distribution of scores',
        yaxis: {
          title: 'Points'
        }
      }



      Plotly.newPlot("lineplot1", data1, layout1, {responsive: true});
      Plotly.newPlot("lineplot2", data2, layout2, {responsive: true});
      Plotly.newPlot("boxplot1", data3, layout3, {responsive: true});
      Plotly.newPlot("boxplot2", data4, layout4, {responsive: true});
      
      

      d3.select("Counta").append("h6").text(p1Ngames);
      })
    };
      

        // for (var j = 0; j < subarray3.length; j++) {
        //   if (j % 6 == 4) {
        //     var itemc = subarray3[j];
        //     console.log(itemc.length)
             
        //     }
        //     else {
        //       subarray4.push(itemc);
        //     }
            
        //   }
        // }
        // console.log(subarray4)
        
        

//    }
//   }
//     });
// };
// Next, the task is to append ":00" to each string
// Next, the task is to Concatenate our arrays so that they are one big array for Plotly to handle



// if (no course history but odds being predicted there) warningMessage2();

function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function warningMessage() {

}

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
cell.text(player2);
var cell = tbodyodds.append("td");
cell.text(score2);
var cell = tbodyodds.append("td");
cell.text(oddsscore);
row.text("");
  });
}


        
        // if (j % 6 == 1) {
        //   var item = entry1[j];
        //   subarray1.push(item);
        // }


          


// I can do an add if the length is 12 or 13, and not if the length is 14.
// if 12, needs 2 added zeroes.
// if 13, needs just 1 added zero.
// Then dashes at preordained indices.



      //   }
      // array1.push(subarray1);
      // array3.push(subarray3);
      // }

      // for (var i = 0; i < array1.length; i++){
      //   sum1 += parseInt(array1[i], 10)
      // }
      // var p1mean = sum1/array1.length;
      // console.log(array1)
      // console.log(p1mean)


      // for (var i = 0; i < careerscores[1].length; i++){
      //   var entry2 = careerscores[1][i];
      //   subarray2 = [];
      //   for (var j = 0; j < entry2.length; j++)
      //   if (j % 6 == 1) {
      //     var item2 = entry2[j];
      //     subarray2.push(item2);
      //   }
      // array2.push(subarray2);
      // }
      // for (var i = 0; i < array2.length; i++){
      //   sum2 += parseInt(array2[i], 10)
      // }
      // var p2mean = sum2/array2.length;
      // console.log(array2)
      // console.log(p2mean)

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