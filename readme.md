# Tap Trouble
https://github.com/jacobjghughes/FlowRates

To begin, I created a simple single tap model that calculated the runtime by dividing the total bottle sizes by the flow rate.

After implementing a single tap calculator, I struggled to think of a way to calculate the tap times rather than simulating time passing with a loop (slow and inefficient).

I realised that if the time elapsed for each tap is stored seperately, then we know that the next available tap is the tap with the lowest time. This way, we can assign the next person in the queue to the next available tap.
We can calculate the total runtime for all taps by adding the times together, and we can find the real time taken to serve every customer by taking the largest value in the array.

## Input validation
The inputs required from the user are the `QUEUE` array, and `TAP_SPEEDS` array. I wrote functions that validate these two arrays, checking that they are arrays and that all the elements are positive numbers. While the validation logic is identical for these two arrays, I chose to use seperate functions so that the error messages can be more specific.

## Time to walk to tap
My implementation logic applies the penalty to every person (we start timing when the first person starts walking to their tap). 
We apply the walking penalty after the available tap has been calculated, for simplicity; this assumes that once a person has decided which tap to use, they do not divert course if a different tap becomes available on their journey over.

## Different flow rates of taps (hard)
I was using a `const NUM_TAPS` to store the number of taps (all with the same flow rate) in the simulator, but I deprecated this feature in favour of a const array of `TAP_SPEEDS`. This way, each tap's speed can be configured in the header and we can infer the number of taps from the length of the array. 

## Improvements
**Implement OOP methodology**
    By creating a tap object, we could store additional information about each tap that could be useful for implementing new features, such as storing the number of bottles a given tap has filled, and disambiguating the actual running time of a tap and the walking penalty.
    The tap object could hold information such as it's flow rate and time running, rather than storing this information in seperate arrays.
    By using tap objects, we could also alter the setup more easily (such as adding extra taps with varied flow rates) rather than the current method of updating the `const` global arrays in the header.

## Faster taps, slower time (very hard)
> *According to your function from bonus point 3 above, is it possible for your function to output a larger number (e.g., it takes longer to fill all the bottles) if you increase the flow rate of at least one of the taps (it takes less time to fill a bottle). If yes, find an example. If no, prove it.*

I don't know how to formally prove this, but I believe the answer to be no. I've made an attempt at reasoning about this but I'm missing the principle to make a solid proof. *(I suspect this is maybe some sort of induction-based proof that my ideas are getting close to but I can't work it out.)*

Suppose there is a bottle **B** of size `n`, where `n` is larger than the sum of all other bottles after it in the queue. 
To maximise time taken, we need to have **B** filled at the slower tap AND for the slower tap to be the available tap when **B** is next in the queue. Additionally, the runtime of the slow tap before **B** is filled needs to be greater than or equal to the base case. I can't see how all of these criteria can be satisfied while increasing the speed of a tap.