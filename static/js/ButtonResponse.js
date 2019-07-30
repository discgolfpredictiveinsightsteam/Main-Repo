function respond_to_button() {
    d3.event.preventDefault();
    console.log("Your button is reacting");
    var userSelectedCrypto1 = d3.select("#Player1Input").node().value;
    var userSelectedCrypto2 = d3.select("#Player2Input").node().value;
    var userSelectedDateTime1 = d3.select("#CourseInput").node().value;
    var userSelectedDateTime2 = d3.select("#DateTimeInput").node().value;
    console.log(userSelectedCrypto1);
    console.log(userSelectedDateTime1);

    buildPlot(userSelectedCrypto1, userSelectedCrypto2, userSelectedDateTime1, userSelectedDateTime2);
};