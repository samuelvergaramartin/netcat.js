import { type HTTPMethods } from '../types/index.js';
import { RAM } from '../utils/RAM.js';

export default async function request<T extends BodyInit, U>({
    url,
    method,
    useToken = true,
    body
} : Params<T>) : Promise<U> {
    const token = RAM.get("bot-token") as string;
    let data : U | null = null;
    const response = await fetch(url, {
        headers: useToken ? {
            'Content-Type': 'application/json',
            'Authorization': token
        } : {
            'Content-Type': 'application/json'
        },
        method: method,
        body: body
    });

    if(response.ok) {
        if(method === "GET") {
            data = await response.json();
        }
    }

    return data ? data : {} as U;
}

type Params<T> = {
    method: HTTPMethods,
    useToken?: boolean,
    url: string,
    body?: T
}