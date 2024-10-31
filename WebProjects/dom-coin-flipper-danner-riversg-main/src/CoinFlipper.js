// Class: SWE2511 - Coin Flipper DOM
// Name: Gavin Danner-Rivers
// Class Section: 121

window.onload = () => {
    // Run the coin flipper code when the browser finishes loading the js file
    document.getElementById("submit").addEventListener("click", run);
};

/**
 * This method flips a specified number of coins a specified number of times
 * and gathers the number of times a certain number of heads occurred in each flip into a frequency[] array.
 * @param coins the number of coins to flip
 * @param times the number of times to flip each coin
 * @return array representing the frequency of 'heads' for each flip repetition
 */
let flipCoins = function(coins, times) {
    // This loop fills up frequency 'bins'.
    //    Each iteration simulates one group of coin flips.
    // For example, with a group of flips of 3 coins, heads may come up 0, 1, 2, or 3 times.

    // Allocate the array per user-specified input (note: Java initializes the contents to 0).
    let frequency = [];
    for(let i = 0; i <= coins; i++) {
        frequency[i] = 0;
    }
    for(let rep = 0; rep < times; rep++) {
        // perform a flip of the coins
        let heads = flipCoinsOneTime(coins);
        frequency[heads]++; // update appropriate bin
    }
    return frequency;
};

/**
 * This method flips a set of coins and returns the number heads that occurred.
 * It makes use of a random number generator to randomly generate heads or tails for each flip.
 * @param coins the number of coins to flip
 * @return number of heads that occurred in the flips
 */
let flipCoinsOneTime = function(coins) {
    let heads = 0;
    for(let i = 0; i < coins; i++) { // flip the coin
        heads += Math.floor(Math.random() * 2); // computed random int value is either 0 or 1 (tails or heads)
    }
    return heads; // number of heads that came up
};

/**
 * This method prints a histogram of the number of heads that occurred for a specified number of flip repetitions
 * Notes: The output generated for coins=5 and times=100000 may look something like this:
 *
 * Number of times each head count occurred in 100000 flips of 5 coins:
 * 0  3076  ***
 * 1  15792  ****************
 * 2  31348  *******************************
 * 3  31197  *******************************
 * 4  15552  ****************
 * 5  3035  ***
 *
 * @param coins the number of coins flipped in each repetition
 * @param times the number of times the coins were flipped
 * @param frequency the frequency (count) of heads for each flip repetition
 */
let printHistogram = function(coins, times, frequency) {
    const histogram = document.getElementById("histogram");
    const time = document.getElementById("time");
    histogram.style.display = "block";
    time.style.display = "block";

    const numberOfHeads = document.getElementById("numberOfHeads");
    const numberOfOccurrences = document.getElementById("numberOfOccurrences");
    const progressBars = document.getElementById("progressBars");

    numberOfHeads.innerHTML = "";
    numberOfOccurrences.innerHTML = "";
    progressBars.innerHTML = "";

    const maxWidth = window.innerWidth - 200;
    const maxItems = Math.max.apply(null, frequency);

    // This loop prints the histogram. Each iteration prints one histogram bar.
    for(let heads = 0; heads < frequency.length; heads++) {
        const firstColumn = document.createElement("LABEL");
        const br = document.createElement("BR");
        firstColumn.innerText = "" + heads;
        numberOfHeads.appendChild(firstColumn);
        numberOfHeads.appendChild(br);

        const secondColumn = document.createElement("LABEL");
        const br2 = document.createElement("BR");
        secondColumn.innerText = frequency[heads];
        numberOfOccurrences.appendChild(secondColumn);
        numberOfOccurrences.appendChild(br2);

        const value = "" + Math.round((frequency[heads]/maxItems) * 100);

        const thirdColumn = document.createElement("PROGRESS");
        const  br3 = document.createElement("BR");
        thirdColumn.setAttribute("max", "100");
        thirdColumn.setAttribute("value", value);
        thirdColumn.style.width = maxWidth + "px";
        progressBars.appendChild(thirdColumn);
        progressBars.appendChild(br3);
    }
};

const inputValidated = (numberOfCoins, numberOfRepetitions) => {
    // The frequency array holds the number of times a particular number of heads occurred:
    // frequency[0] holds the number of times 0 heads occurred
    // frequency[1] holds the number of times 1 head occurred
    // ...
    // frequency[numberOfCoins] holds the number of times all heads occurred
    let executionTime = performance.now(); // current system time snapshot
    let frequency = flipCoins(numberOfCoins, numberOfRepetitions); // flip numberOfCoins coins numberOfRepetitions times
    executionTime = Math.round((performance.now() - executionTime) * 1000) / 1000; // compute elapsed time

    // NOTE: Do not include histogram generation in execution time calculation - console I/O takes a long time compared to internal math computations
    printHistogram(numberOfCoins, numberOfRepetitions, frequency); // display the resulting histogram

    console.log("Coin Flipper Time: " + executionTime + "ms");
    const time = document.getElementById("time");
    time.innerText = "Coin Flipper Time: " + executionTime + "ms";
};

/**
 * run - Coin flipper entry point
 *       NOTE: Feel free to change this to use a JavaScript class if desired
 */
const run = () => {
    let numberOfCoins = parseFloat(document.getElementById("numCoins").value);        // number of coins to flip
    let numberOfRepetitions = parseFloat(document.getElementById("numFlips").value);  // number of times the coins are flipped
    const coinError = document.getElementById("coinError");
    const flipError = document.getElementById("flipError");
    const histogram = document.getElementById("histogram");
    const time = document.getElementById("time");

    coinError.innerText = "";
    flipError.innerText = "";
    histogram.style.display = "none";
    time.style.display = "none";

    let coinsValid = false;
    let flipsValid = false;

    // Display error messages if needed
    if(isNaN(numberOfCoins)) {
        coinError.innerText = "The number of coins must be a number.";
    } else if(numberOfCoins < 1) {
        coinError.innerText = "The number of coins must be greater than or equal to 1.";
    } else if(numberOfCoins > 10) {
        coinError.innerText = "The number of coins must be less than or equal to 10.";
    } else if(!Number.isInteger(numberOfCoins)) {
        coinError.innerText = "The number of coins must be an integer";
    } else {
        coinsValid = true;
    }

    if(isNaN(numberOfRepetitions)) {
        flipError.innerText = "The number of repetitions must be a number.";
    } else if(numberOfRepetitions < 1) {
        flipError.innerText = "The number of repetitions must be greater than or equal to 1.";
    } else if(numberOfRepetitions > 1000000) {
        flipError.innerText = "The number of repetitions must be less than or equal to 1000000.";
    } else if(!Number.isInteger(numberOfRepetitions)) {
        flipError.innerText = "The number of repetitions must be an integer";
    } else {
        flipsValid = true;
    }

    if(coinsValid && flipsValid) {
        inputValidated(numberOfCoins, numberOfRepetitions);
    } else if(!coinsValid) {
        flipError.innerHTML = "&nbsp;";
    }
};