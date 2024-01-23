import * as CryptoJS from 'crypto-js';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import axios from 'axios'
import { SklandResponseBody } from './index';

const generateSignature = (
    token: string,
    path: string,
    bodyOrSearch: string
): { sign: string; header: Record<string, string> } => {
    const t: string = (Math.floor(Date.now() / 1000) - 2).toString();

    const header = {
        platform: '',
        timestamp: '',
        dId: '',
        vName: '1.4.1'
    };
    header.timestamp = t;
    const headerStr: string = JSON.stringify(header);
    const s: string = path + bodyOrSearch + t + headerStr;

    // Calculate HMAC using CryptoJS
    const hmac = CryptoJS.HmacSHA256(s, token);
    const hexS: string = CryptoJS.enc.Hex.stringify(hmac);

    // Calculate MD5 using CryptoJS
    const md5 = CryptoJS.MD5(hexS).toString();

    return { sign: md5, header };
};


const getSignHeader = (
    cred: any,
    url: string,
    body: any,
    isGet: boolean
): Record<string, any> => {
    const header: Record<string, any> = { cred: cred.cred };

    const parsedUrl = new URL(url);

    let signedExtraHeader: Record<string, any> = {};

    if (isGet) {
        const { sign, ...extraHeader } = generateSignature(cred.token, parsedUrl.pathname, parsedUrl.search.replace('?', ''));
        header.sign = sign;
        signedExtraHeader = extraHeader.header;
    } else {
        const { sign, ...extraHeader } = generateSignature(cred.token, parsedUrl.pathname, JSON.stringify(body));
        header.sign = sign;
        signedExtraHeader = extraHeader.header;
    }

    for (const key in signedExtraHeader) {
        if (signedExtraHeader.hasOwnProperty(key)) {
            header[key] = signedExtraHeader[key];
        }
    }

    return header;
};

export async function fetch<T>(cred: any, config: AxiosRequestConfig): Promise<T> {
    const header = config['headers']
    const params = config['params']
    const queryString = new URLSearchParams(params).toString();
    const url = `https://zonai.skland.com${config['url']}?${queryString}`
    const method = config['method']
    var isGet = false
    var body = config['data']
    if (method === 'get' || !method) {
        isGet = true
    }
    if (method === 'get' || !method || !body) {
        body = {}
    }

    const credDict = JSON.parse(cred)

    const signedHeader = getSignHeader(credDict, url, {}, isGet)
    config['headers'] = { ...header, ...signedHeader }

    const { data: { data } }: AxiosResponse<SklandResponseBody<T>> = await axios(config);
    return data;
}