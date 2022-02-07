// передавать дату до которого времени отсчитывать время
// вывод "осталось столько то дней, минут часов и тд
// раз в сек выводить таймеры
// потом ремув таймер когда кончится, а остальные продолжаются


const EventEmitter = require('events');
const emitter = new EventEmitter();


const setTimer = (hour, day) => {
    console.log('hour = ' + hour + 'day = ' + day)

}
// получаем значение для таймера минуты и секунды
let min = Number(process.argv[2]);
let sec = Number(process.argv[3]);

// генерация таймера

    let timer;
    let duration = (min * 60) + sec;
    countdown(duration);
    emitter.emit('timer'); // создание события


//let duration = 5; // стартовое значение обратного отсчета
// countdown(); // вызов функции

const countdown = async (duration) => {  // функция обратного отсчета
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);

    // для добавления нулей перед цифрой когда меньше 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    console.log(minutes + ":" + seconds);
    duration--; // уменьшаем число на единицу
    if (duration < 0){
        clearTimeout(timer); // таймер остановится на нуле
        console.log('Таймер закончился');
    }
    else {
        emitter.emit('timerIsOver'); // создание события
        timer = setTimeout(countdown, 1000);
    }
}

class Handler {
    static status() {
        console.log('Timer status');
    }
    static timerIsOver() {
        console.log('timerIsOver');
    }
}

emitter.on('status', Handler.status);
emitter.once('timerIsOver', Handler.timerIsOver); // реагирование на событие только 1 раз


// обработчик для ошибок
emitter.on('sign', () => {
    emitter.emit('error', 'broken pen');
});



//emitter.emit(type, payload); // создание события