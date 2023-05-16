const FLOW_RATE = 100; // flow rate in ml / sec
const NUM_TAPS = 4;
const QUEUE = [400, 750, 1000, 600, 400, 1000, 1500, 300, 550, 450, 500, 600, 300, 100, 1000];
const WALK_TIME = 5.0;
const USE_WALK_DELAY = true;

function verifyQueue(queue) {
    try {
        if (Array.isArray(queue)) {
            for (element of queue) {
                // we check that each element is a positive number
                if (isNaN(element) || element <= 0) {
                    throw new Error("An element of the queue is not a valid number.");
                }
            }
        }
        else {
            throw new Error("Queue is not an array.");
        }
        return true;
    }
    catch(error) {
        console.log("Error: " + error.message)
        return false;
    }
}

function calculateTimeSingleTap(queue) {
    let timeElapsed = 0.0;
    for(bottle of queue) {
        // time taken per bottle is bottle size / flow rate
        timeElapsed += (bottle / FLOW_RATE);
    }
    console.log("Time to fill all bottles: " + timeElapsed + " seconds.");
    return;
}

function sumArray(array) {
    let sum = 0.0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

function calculateTimeMultiTap(bottleQueue) {
    let tapTimes = new Array(NUM_TAPS).fill(0);
    let waitingTime = 0.0;

    while (bottleQueue.length > 0) {
        // find the lowest tap time in the array and return the index of the first occurence
        let lowestTime = Math.min(...tapTimes);
        let lowestIndex = tapTimes.indexOf(lowestTime);
        // remove the front person from the queue and add their time to the available tap
        let nextBottle = bottleQueue.shift();
        tapTimes[lowestIndex] += (nextBottle / FLOW_RATE);
        // here we add delay (if enabled) to account for the next person walking to the tap
        // assume this delay is not applied before the first person, and we don't add delay after the last person in the queue
        if (USE_WALK_DELAY && bottleQueue.length != 0) {
            tapTimes[lowestIndex] += WALK_TIME;
            waitingTime += WALK_TIME;
        }
    }
    
    // calculate and output the times (sum of tap times, longest tap time)
    let sumRuntime = sumArray(tapTimes);
    let actualTime = Math.max(...tapTimes);
    console.log("Sum runtime of all taps: " + (sumRuntime - waitingTime) + "seconds.");
    console.log("Time spent walking to taps: " + waitingTime + "seconds.");
    console.log("Time taken to fill all bottles: " + actualTime + "seconds.");
}

if (verifyQueue(QUEUE)) {
    calculateTimeMultiTap(QUEUE);
}