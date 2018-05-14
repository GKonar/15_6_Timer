'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        this.running = false; // warości początkowe instancji
        this.display = display; // element DOM pod którym znajduje się stoper
        this.reset();
        this.print(this.times);
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            //metoda reset, zeruje stoper
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.print(this.times);
            this.stop();
        }
    }, {
        key: 'print',
        value: function print() {
            // metoda ta ustawia wewnętrzny tekst elementu DOM, dzieje się to przy użyciu metody format();
            this.display.innerText = this.format(this.times); //format przygotowuje tekst do wyświetlenia
        }
    }, {
        key: 'format',
        value: function format(times) {
            // 00:00:00 
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            if (!this.running) {
                //sprawdzamy czy timer nie chodzi
                this.running = true, //uruchamiamy stoper
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10); // pierwszy parametr to callback, co 10 ms uruchamia funkcję
            } // ,metodę this.step
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            // przlicza minuty na sekundy, sekundy na milisekundy
            this.times.miliseconds += 1;
            if (this.times.miliseconds >= 100) {
                this.times.seconds += 1;
                this.times.miliseconds = 0;
            }
            if (this.times.seconds >= 60) {
                this.times.minutes += 1;
                this.times.seconds = 0;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            //zatrzymanie timera
            this.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: 'round',
        value: function round() {
            //kolejna runda
            var roundTime = document.getElementById('results');
            var nextRound = document.createElement('li');
            nextRound.innerHTML = "Beer time, " + this.format(this.times) + " Yeeeaah!!";
            roundTime.appendChild(nextRound);
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.print(this.times);
        }
    }, {
        key: 'clear',
        value: function clear() {
            location.reload();
        }
    }]);

    return Stopwatch;
}();

;

function pad0(value) {
    // ma za zadanie dodać 0 do liczb jednocyfrowych
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var stopwatch = new Stopwatch(document.querySelector('.stopwatch')); //display === .stopwatch

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
    return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    return stopwatch.reset();
});

var roundButton = document.getElementById('round');
roundButton.addEventListener('click', function () {
    return stopwatch.round();
});

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function () {
    return stopwatch.clear();
});
