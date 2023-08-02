import React, {Fragment} from 'react';
import {Divider} from 'primereact/divider';
import {Avatar} from 'primereact/avatar';
import {Components} from '@icon-park/react';
import {RoomHeader, RoomResidentChars} from './Room';
import {InfrastructureRoomProps} from '../../../skland-api/arknights/infrastructure';
import {InfrastructureControl} from '../../../skland-api/arknights';

const Control = ({model, method}: InfrastructureRoomProps<InfrastructureControl>) => {
    return (
        <Fragment>
            <RoomHeader title='控制中枢' level={model.level}/>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex align-items-center h-2rem gap-2'>
                    <Avatar icon={<Components/>}/>
                    <div>LEVEL OF CONTROL INTERFACE</div>
                </div>
                <RoomResidentChars chars={model.chars} max={5} method={method}/>
            </div>
        </Fragment>
    );
};

export default Control;