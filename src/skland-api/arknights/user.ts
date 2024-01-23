import axios from 'axios';
import { Player } from './index';
import { SklandResponseBody } from '../index';
import { fetch } from '../util';

export const queryArknightsRole = async (cred: string, uid: string | number) => {
    const config = {
        url: '/api/v1/game/player/info',
        params: { uid },
    };

    return await fetch<Player>(cred, config)
};