const fs = require('fs');
const path = require('path');
const http = require("http");
const url = require('url');

http.createServer((req,res) => {
    // получили короткий путь
    let { pathname } = url.parse(req.url,true);

    // получили полный путь
    const fullPath = path.join(__dirname, pathname);

    // проверяем есть ли указанный путь
    if(fs.existsSync(fullPath)) {
        // если указанный путь существует
        if (fs.lstatSync(fullPath).isFile()) {  // если это файл, то выводим его содержимое
            const data = fs.readFileSync(fullPath, 'utf-8');
            res.setHeader('Content-Type',  'text/plain; charset=utf-8');
            res.write(data);
        } else if (fs.lstatSync(fullPath).isDirectory()) {  // если это папка, то перебираем что там есть и выводим ее содержимое
            const data = fs.readdirSync(fullPath);
            res.setHeader('Content-Type',  'text/html; charset=utf-8');
            data.forEach(el => {
                let link = `http://localhost:5555${pathname}/${el}`; // добавляет лишний слеш при переходе из корня сайта, но все работает
                res.write(`<a href="${link}">${el}</a> \n`);
            })
        }
    } else  {
        // если файла нет
        res.write('no such path');
    }
    res.end()
}).listen(5555);
