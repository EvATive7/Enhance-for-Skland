import React from 'react';
import {Divider} from 'primereact/divider';
import {Rating} from 'primereact/rating';
import {Avatar} from 'primereact/avatar';
import MiniProgressBar from '../MiniProgressBar';
import {Check, Hourglass, Sleep, Square} from '@icon-park/react';

interface PlayerRecruitCardProps {
    character: ArknightsPlayer;
}

const recruitTag: { [id: number]: string } = {
    1: '近卫干员',
    2: '狙击干员',
    3: '重装干员',
    4: '医疗干员',
    5: '辅助干员',
    6: '术师干员',
    7: '特种干员',
    8: '先锋干员',
    9: '近战位',
    10: '远程位',
    12: '控场',
    15: '治疗',
    16: '支援',
    17: '新手',
    18: '费用回复',
    19: '输出',
    20: '生存',
    21: '群攻',
    22: '防护',
    23: '减速',
    24: '削弱',
    25: '快速复活',
    26: '位移'
};

const getTagColor = (tagId: number) => {
    switch (tagId) {
        case 7:
        case 12:
        case 16:
        case 24:
        case 25:
        case 26:
            return 'mediumslateblue';
    }
    return 'transparent';
};

const PlayerRecruitCard = ({character}: PlayerRecruitCardProps) => {
    const {building, recruit} = character;

    const recruitCard = (data: ArknightsRecruit, index: number) => {
        const progress = () => {
            switch (data.state) {
                case 1:
                    return 0;
                case 3:
                    return 100;
                case 2:
                    const remaining = data.finishTs - new Date().getTime() / 1000;
                    if (remaining <= 0) return 100;
                    return (data.duration - remaining) / data.duration * 100;
            }
        };

        const status = () => {
            const sleep = <Sleep style={{color: 'lightblue'}}/>;
            const working = <Hourglass className='p-icon-spin' style={{color: 'gold'}}/>;
            const done = <Check style={{color: 'lightgreen'}}/>;

            switch (data.state) {
                case 1:
                    return sleep;
                case 2:
                    if (progress() == 100) return done;
                    return working;
                case 3:
                    return done;
            }
        };

        return (
            <div className='flex col surface-0 border-round-lg gap-2'>
                <Avatar label={index.toString()}/>
                <div className='flex flex-column flex-grow-1 justify-content-end gap-1'>
                    <div className='flex align-items-center gap-1'>
                        {data.selectTags.map(({tagId}) => (
                            <div className='text-xs surface-d border-round overflow-hidden' key={tagId}>
                                <div className='tag' style={{background: getTagColor(tagId)}}>
                                    {recruitTag[tagId] || `Tag_${tagId}`}
                                </div>
                            </div>
                        ))}
                        <div className='flex-grow-1'/>
                    </div>
                    <MiniProgressBar value={progress()}/>
                </div>
                <Avatar icon={status()}/>
            </div>
        );
    };

    return (
        <div className='flex flex-column surface-card border-round-xl shadow-2'>
            <div className='flex align-items-baseline gap-2 select-none p-3'>
                <div className='text-xl'>公开招募</div>
                <div className='text-sm'>NORMAL GACHA</div>
                <div className='flex-grow-1'/>
                <div className='flex gap-2'>
                    <div>联络次数</div>
                    <Rating className='gap-1 text-primary' stars={3} cancel={false} readOnly
                            value={building.hire.refreshCount} onIcon={<Square theme='filled'/>} offIcon={<Square/>}/>
                </div>
            </div>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-3 p-3'>
                <div className='flex gap-3'>
                    {recruitCard(recruit[0], 1)}
                    {recruitCard(recruit[1], 2)}
                </div>
                <div className='flex gap-3'>
                    {recruitCard(recruit[2], 3)}
                    {recruitCard(recruit[3], 4)}
                </div>
            </div>
        </div>
    );
};

export default PlayerRecruitCard;