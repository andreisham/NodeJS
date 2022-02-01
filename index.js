const colors = require('colors');

let colOfNums = 0; // флаг для проверки выводилось ли простое число
let colorNum = 0; // номер цвета для светофора

simpleNums(Number(process.argv[2]), Number(process.argv[3]))

function simpleNums(firstNum, lastNum) {
    if ((Number.isInteger(firstNum) && firstNum > 0) && (Number.isInteger(lastNum) && lastNum > 0) && (lastNum > firstNum)) {
        checkNum:
            for (let i = firstNum; i <= lastNum; i++) { // перебираем все числа из диапазона
                for (let j = 2; j < i; j++) {
                    if (i % j === 0) {
                        // число не простое, выходим из цикла
                        continue checkNum;
                    }
                }
                    let color = colorSwitcher(colorNum)
                    switch (color) { // выводим простое число светофором
                        case 'green':
                            console.log(colors.green(i));
                            colorNum++;
                            colOfNums++;
                            break;
                        case 'yellow':
                            console.log(colors.yellow(i));
                            colorNum++
                            colOfNums++;
                            break;
                        case 'red':
                            console.log(colors.red(i));
                            colorNum = 0
                            colOfNums++;
                            break;
                }
            }
            if (colOfNums === 0) {console.log(colors.red('Простых чисел нет в диапазоне:('))}
    } else {
        console.log(colors.red('Введенное значение не число, меньше нуля или первое число больше последнего!'));
    }
}

// функция отдает значение цвета в зависимости от счетчика i
function colorSwitcher (i) {
    let colors = ['green', 'yellow', 'red'];
    return colors[i];
}


