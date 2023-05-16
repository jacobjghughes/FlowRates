console.log("Hello World.");

const FLOW_RATE = 100; // flow rate in ml / sec
const NUM_TAPS = 4;
const QUEUE = [400, 750, 1000, 600, 400, 1000, 1500, 300, 550, 450, 500, 600, 300, 100, 1000];

function verifyQueue(queue) {
    if (Array.isArray(queue)) {
        for (element of queue) {
            if (isNaN(element)) {
                console.log("An element of the queue is not a number.");
                return false;
            }
        }
    }
    else {
        console.log("Queue is not an array.");
        return false;
    }
    console.log("Valid queue.");
    return true;
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

    while (bottleQueue.length > 0) {
        let lowestTime = Math.min(...tapTimes);
        let lowestIndex = tapTimes.indexOf(lowestTime);
        let nextBottle = bottleQueue.shift();
        tapTimes[lowestIndex] += (nextBottle / FLOW_RATE);
    }
    
    // calculate and output the times (sum of tap times, longest tap time)
    let sumRuntime = sumArray(tapTimes);
    let actualTime = Math.max(...tapTimes);
    console.log("Sum runtime of all taps: " + sumRuntime + "seconds.");
    console.log("Time taken to fill all bottles: " + actualTime + "seconds.");
}

if (verifyQueue(QUEUE)) {
    calculateTimeMultiTap(QUEUE);
}