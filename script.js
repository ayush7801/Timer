let countdown;

const display = document.querySelector('.display h1');
const arrivalTime = document.querySelector('.display p');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    const now = Date.now();
    const then = (now + (seconds * 1000));
    if(countdown){
        const val = window.confirm('You sure want to stop this timer & start new One');
        if(val)
        clearInterval(countdown);
    }
    displayTimeLeft(seconds);
    displayArrivalTime(then);
    countdown = setInterval(function(){
        let secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayArrivalTime(seconds){
    const time = new Date(seconds);
    const hours = time.getHours();
    const mins = time.getMinutes();
    const str = `Your break ends at ${hours > 12 ? hours-12 : hours}:${mins < 10 ? '0' : ''}${mins}`;
    arrivalTime.textContent = str;
}

function displayTimeLeft(seconds){
    const mins =  Math.floor(seconds/60);
    seconds = seconds%60;
    const str = `${mins}:${seconds > 9 ? '' : '0'}${seconds}`;
    display.textContent = str;
    document.title = str;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
})

