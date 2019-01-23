
/* global Promise */

/**
 * Глобальная вероятность успеха для удобства тестирования
 */
const GLOBAL_PROPABILITY = 0.9;
const BAD_JSON_PROPABILITY = 0.1;


/**
 * Получить все записи из хранилища
 */
export async function all(){
    return TimeoutPropabiliry(300, GLOBAL_PROPABILITY).then(() => {
            return serverAnswer(articlesStorage);
        }, () => {
            throw new Error("Propability Error in articles list");
    });
}

/**
 * Получить статью по id
 * @param {int} id Id статьи
 */
export async function get(id){
    return TimeoutPropabiliry(300, GLOBAL_PROPABILITY).then(() => {
            return serverAnswer(articlesStorage[mapArticles[id]]);
        }, () => {
            throw new Error("Propability Error in articles one");
    });
}

/**
 * Удалить статью из базы
 * @param {int} id Id статьи
 */
export async function remove(id){
    return TimeoutPropabiliry(300, GLOBAL_PROPABILITY).then(() => {
            if(id in mapArticles){
                let num = mapArticles[id];
                delete mapArticles[id];
                articlesStorage.splice(num, 1);
                return serverAnswer(true);
            }
            else{
                return serverAnswer(false);
            }
        }, () => {
            throw new Error("Propability Error in articles delete");
    });
}

/* полуприватная часть, вдруг захотите сделать промис :) */
function TimeoutPropabiliry(time, probability){
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            Math.random() < probability ? resolve() : reject();
        }, time)
    });
}

function serverAnswer(data, code = 200, status = "OK"){
    if(Math.random() < BAD_JSON_PROPABILITY){
        throw new Error('Incorrect json');
    }

    return JSON.stringify({
        code, 
        status,
        data
    });
}

/*  приватная часть */ 
let articlesStorage = [
    {
        id: 1,
        title: 'Промисификация кода',
        dt: '2018-12-06',
        text: 'Код без промисов бывает жестью, но и с ними можно изобразить много странного.'
    },
    {
        id: 2,
        title: 'Итераторы и генераторы',
        dt: '2018-12-01',
        text: 'Сначала пугают всех, кто к ним прикасается, а Symbol кажется бредом.'
    },
    {
        id: 5,
        title: 'Javascript',
        dt: '2018-12-02',
        text: 'Всё равно хороший язык программирования.'
    }
];

let mapArticles = {};

articlesStorage.forEach((item, i) => {
    mapArticles[item.id] = i;
});

