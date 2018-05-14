class Stopwatch {
    constructor(display) {
        this.running = false; // warości początkowe instancji
        this.display = display; // element DOM pod którym znajduje się stoper
        this.reset();
        this.print(this.times);
    }
  
    reset() {               //metoda reset, zeruje stoper
        this.times = {
    		minutes: 0,
    		seconds: 0,
    		miliseconds: 0
        }	
        this.print(this.times);
        this.stop(); 
    }

    print() {    // metoda ta ustawia wewnętrzny tekst elementu DOM, dzieje się to przy użyciu metody format();
    	this.display.innerText = this.format(this.times); //format przygotowuje tekst do wyświetlenia
    }

    format(times) { // 00:00:00 
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {                                    //sprawdzamy czy timer nie chodzi
            this.running = true,                                //uruchamiamy stoper
            this.watch = setInterval(() => this.step(), 10);    // pierwszy parametr to callback, co 10 ms uruchamia funkcję
        }                                                       // ,metodę this.step
    }

    step() {
        if (!this.running) return; 
        this.calculate(); 
        this.print();
    }

    calculate() { // przlicza minuty na sekundy, sekundy na milisekundy
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes +=1;
            this.times.seconds = 0;
        }
    }

    stop() { //zatrzymanie timera
        this.running = false;
        clearInterval(this.watch);
    }

    round() { //kolejna runda
        let roundTime = document.getElementById('results'); 
        let nextRound = document.createElement('li' );       
        nextRound.innerHTML = "Beer time, " + this.format(this.times) + " Yeeeaah!!";               
        roundTime.appendChild(nextRound);                   
    }

    clear() {
      location.reload();
    }
};


function pad0(value) {  // ma za zadanie dodać 0 do liczb jednocyfrowych
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch')); //display === .stopwatch

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

let roundButton = document.getElementById('round');  
roundButton.addEventListener('click', () => stopwatch.round()); 

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());






