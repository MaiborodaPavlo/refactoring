import * as serverApi from './db';

async function request(func, arg = null) {
    let responseJSON = await func(arg);
    try{
        let response = JSON.parse(responseJSON);

        return response.data;

    }catch{
        throw new Error("Incorrect JSON");
    }
}

let all = () => request(serverApi.all);
let one = (id) => request(serverApi.get, id);
let remove = (id) => request(serverApi.remove, id);

export {all, one, remove};