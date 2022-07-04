
// TIMER CODE BY MUSIC & CODING
function Timer(callback, timeInterval, options){
    this.timeInterval = timeInterval;

    //Start timer
    this.start = () => {
        // Set expected time
        this.expected = Date.now() + this.timeInterval;
        
        this.theTimeout=null;

        if (options.immediate) {
            callback();
        }

        this.timeout = setTimeout(this.round,this.timeInterval);
        console.log('Started');
    }

    //Stop timer
    this.stop = () => {
        clearTimeout(this.timeout);
        console.log('Stopped');
    }

    //Method that takes care of running our callback and adjusting the time interval
    this.round = () => {
        console.log('timeout', this.timeout);

        let drift = Date.now() - this.expected;
        //Check if drift is greater than time interval and run error callback if true
        if (drift > this.timeInterval) {
            if (options.errorCallback) {
                //add more code here if desired
                options.errorCallback();
            }
        }

        callback();
        this.expected += this.timeInterval;
        console.log(drift);
        console.log(this.timeInterval - drift);
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}
export default Timer;

// const myTimer = new Timer(() => {console.log('It ran')}, 1000, ()=>{console.log('ERROR')});


// function startTest() {
//     myTimer.start();
// }


// function stopTest() {
//     myTimer.stop();
// }