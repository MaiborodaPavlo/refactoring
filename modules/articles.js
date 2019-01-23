import * as serverApi from './db';

async function request(func, arg = null) {

    let response = await func(arg);
    if (response) return JSON.parse(response).data;
}

async function all(){

    return request(serverApi.all);
}

async function one(id){

    return request(serverApi.get, id);
}

async function remove(id){

    return request(serverApi.remove, id);
}

export {all, one, remove};