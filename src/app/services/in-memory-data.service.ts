import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Device } from '../models/device';
import { Injectable } from '@angular/core';
import { DeviceType } from '../models/device-type';
import { DeviceStatus } from '../models/device-status';
import { EventType } from '../models/event-type';
import { EventSevirity } from '../models/event-severity';
import {eventsFactory} from '../factories/events-factory';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const devices = [
      { id: 11, name: 'Iphone X', ip: '192.177.22.9', type: DeviceType.mobile, status: DeviceStatus.active,events: 
      eventsFactory.buildList(5)
      //[
        //{type: EventType.Log, severity: EventSevirity.medium, description: 'low battery detected'},
        //{type: EventType.Security, severity: EventSevirity.high, description: 'new cookie'}
     // ]
     },
     { id: 12, name: 'Raspberry PI', ip: '45.67.3.87', type: DeviceType.workstation, status: DeviceStatus.active,events: 
      eventsFactory.buildList(5)},
      { id: 13, name: 'Windows SQL Server', ip: '0.0.0.0', type: DeviceType.server, status: DeviceStatus.inactive,events: 
      eventsFactory.buildList(5)},
      { id: 14, name: 'MAC Mini', ip: '192.44.125.9', type: DeviceType.workstation, status: DeviceStatus.inactive,events: 
      eventsFactory.buildList(5)},
      { id: 15, name: 'Amazon Alexa', ip: '192.88.3.7', type: DeviceType.mobile, status: DeviceStatus.active,events: 
      eventsFactory.buildList(5)}
      
    ];
    return {devices};
  }

  // Overrides the genId method to ensure that a device always has an id.
  // If the devices array is empty,
  // the method below returns the initial number (11).
  // if the devices array is not empty, the method below returns the highest
  // device id + 1.
  genId(devices: Device[]): number {
    return devices.length > 0 ? Math.max(...devices.map(device => device.id)) + 1 : 11;
  }
}