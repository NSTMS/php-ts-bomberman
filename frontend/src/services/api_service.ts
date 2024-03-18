import { protocol,host,dir } from "../assets/connection";
import type { ApiMethodType } from "../types/apiMethodType";

export class ApiRequest{
    method: ApiMethodType ;
    headers: Header;
    params: string;

    constructor(apiMethod: ApiMethodType = "GET", apiParams: string = ""){
        this.method = apiMethod;
        this.headers = new Header("json-default");
        this.params = apiParams;
    }

    async _exec_get(){
        try {
            return await fetch(`${protocol}://${host}/${dir}${this.params}`,{
                method:this.method,
                headers:this.headers as {},
            })
        } catch (error) {
            throw error;
        }
    }

    async _exec_post(body: Record<string, any> = {}) {
        try {
            const formData =  ApiRequestHelper._prepare_body(body);
            return await fetch(`${protocol}://${host}/${dir}${this.params}`,{
                method:this.method,
                headers:this.headers as {},
                body: formData
            });
        } catch (error) {
            throw error;
        }
    }
}

class ApiRequestHelper{
    static _prepare_body(body: Record<string, any> = {})
    {
        const fd = new FormData();
        for(let d in body)
        {
            fd.append(d, body[d]);
        }
        return fd;
    } 
}

class Header {
    headers: Record<string, string> = {};

    constructor(mode: string){
        if(mode === "json-default")
        {
            this.set('mode','cors');
            this.set('Access-Control-Allow-Origin','*');
            this.set('Access-Control-Allow-Headers','*');
            this.set("Content-Type","application/json");
        }
    }
    
    set(key: string, value: string) {
        this.headers[key] = value;
    }
}

