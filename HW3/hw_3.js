// подключаем модули
const fs = require('fs');
const { Transform } = require('stream');

const ACCESS_LOG = 'HW3/access.log';

/*
ip адреса для поиска:
    34.48.240.111
    89.123.1.41
 */
const IP_FOR_SEARCH = '89.123.1.41';

// читаем файл
const readStream = fs.createReadStream(ACCESS_LOG);

// делаем фильтрацию
const transformStream = new Transform({
    transform(chunk, encoding, callback) {

        // преобразовал данные в строку и разбил на подстроки
        const chunkParts = chunk
            .toString()
            .split('\n');
        // открываем поток на запись
        const writeStream = fs.createWriteStream(`HW3/${IP_FOR_SEARCH}_requests.log`, {
            encoding: 'utf-8',
            flags: 'a',
        });
        // перебрал подстроки для поиска нужных айпишников
        chunkParts.forEach(elem => {
            if (elem.includes(IP_FOR_SEARCH) ) {
                // Дозаписываем отфильтрованные логи
                writeStream.write(`${elem}\n`);
            }
        })
        callback();
    }
});

readStream.pipe(transformStream).pipe(process.stdout);