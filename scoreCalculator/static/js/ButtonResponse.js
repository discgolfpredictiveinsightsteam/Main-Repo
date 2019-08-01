function respond_to_button() {
    d3.event.preventDefault();
    console.log("Your button is reacting");
    var userSelectedCrypto1 = d3.select("#Player1Input").node().value;
    var userSelectedCrypto2 = d3.select("#Player2Input").node().value;
    var userSelectedDateTime1 = d3.select("#CourseInput").node().value;
    var userSelectedDateTime2 = d3.select("#DateTimeInput").node().value;
    console.log(userSelectedCrypto1);
    console.log(userSelectedDateTime1);

    buildPlot(player1, player2, course, date);
};

function buildPlot(player1, player2, course, date)

    var data_fetch_url = `/score_model/${player1}/${player2}/${course}/${date}`;

    d3.json(data_fetch_url).then(function(data) {

        // Grab values from the response json object to build the plots
        var player = unpack(data.name, 0);
        var score = unpack(data.score, 1);
        var whatever = unpack(data.whatever, 2);

        console.log(player);
        console.log(score);
        console.log(whatever);