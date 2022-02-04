const fs = require('fs');
const readline = require('readline');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs');

const options = yargs
    .positional('p', {
        describe: 'Pattern',
        default: '',
    }).argv;

// приложение может спрашивать у пользователя данные
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = async (query) => new Promise(resolve => rl.question(query, resolve));

function reader(dirFullPath) {
    // смотрим что есть в папке
    const fileList = fs.readdirSync(dirFullPath);
    // пока искал как бы сделать поиск, нашел что все уже сделано до меня и в одну строку :)
    inquirer.registerPrompt("search-list", require("inquirer-search-list"));
    // выбираем что читать
    inquirer.prompt([
        {
            name: 'filename',
            type: 'search-list',
            message: 'выберите файл для чтения',
            choices: fileList,
        }
    ]).then(({filename}) => {
        const fullPath = path.resolve(dirFullPath, filename);
        if (fs.lstatSync(fullPath).isFile()) {  // если это файл, то выводим его содержимое
            const data = fs.readFileSync(fullPath, 'utf-8');
            console.log(data);
        } else if (fs.lstatSync(fullPath).isDirectory()) {  // если это папка, то выводим ее название и перезапускаем функцию
            console.log(filename)
            reader(fullPath);
        }
    });
}

(async () => {
    const dirPath = await question('введите путь до папки с файлом или не вводите:) ');
    let dirFullPath = '';
    // если не ввели путь до файла, то берется путь из текущей директории, иначе берется введенный путь
    dirPath === '' ? dirFullPath = process.cwd() : dirFullPath = path.resolve(__dirname, dirPath);
    reader(dirFullPath);
})();