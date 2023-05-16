After implementing a single tap calculator, I struggled to think of a way to calculate the tap times rather than simulating time passing with a loop.

I realised that if the time elapsed for each tap is stored seperately, then we know that the next available tap is the tap with the lowest time. This way, we can assign the next person in the queue to the next available tap.
We can calculate the total runtime for all taps by adding the times together, and we can find the real time taken to serve every customer by taking the largest value in the array.
