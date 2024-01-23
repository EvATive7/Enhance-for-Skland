import axios from 'axios';
import {SklandBinding, SklandResponseBody, SklandUser} from './index';
import { fetch } from './util';

export const queryUser = async (cred: string) => {
    const config = {
        url: '/api/v1/user/me',
    };
    return await fetch<SklandUser>(cred,config)
};

export const queryBind = async (cred: string) => {
    const config = {
        url: '/api/v1/game/player/binding',
    };
    const fetchResult = await fetch<{ list: SklandBinding[] }>(cred, config)
    const list:any = fetchResult['list']

    return list.length !== 0 ? list : void 0;
};
