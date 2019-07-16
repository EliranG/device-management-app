import {DeviceType} from './device-type';
import {DeviceStatus} from './device-status';
import {DeviceEvent} from './device-event';
import {eventsFactory} from '../factories/events-factory';

export class Device {
    constructor(name:string, ip:string, type: DeviceType){

        this.name = name;
        this.ip= ip;
        this.type = type;
        this.status = this.randomIntFromInterval(0,1) as DeviceStatus; 
        this.events = eventsFactory.buildList(5);
    };

    id:number;
    name: string;
    ip: string;
    type: DeviceType;
    status: DeviceStatus;
    events: DeviceEvent[];

    
    private randomIntFromInterval(min,max) 
    {
    return Math.floor(Math.random()*(max-min+1)+min);
    }
}