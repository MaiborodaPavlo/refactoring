import * as ArticlesModel from './articles';
import "babel-polyfill";

async function ArticlesProccess(){
    let articles = await ArticlesModel.all();
    console.log('articles count = ' + articles.length);

    // берём случайный индекс
    let ind = Math.floor(Math.random() * articles.length);
    console.log('select index ' + ind + ', id = ' + articles[ind].id);

    // получаем статью по id
    let article = await ArticlesModel.one(articles[ind].id);
    console.log(article);

    // пробуем удалить её
    let delRes = await ArticlesModel.remove(article.id);
    console.log('что с удалением? - ' + delRes);

    // а сколько статей в базе сейчас
    articles = await ArticlesModel.all();
    console.log('articles count = ' + articles.length);
}

ArticlesProccess().catch((err) => console.log(err.message));