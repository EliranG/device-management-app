import * as Factory from  'factory.ts'
import {DeviceEvent} from '../models/device-event'

export const eventsFactory = Factory.Sync.makeFactory<DeviceEvent>({
    type:  Factory.each(i => 1 + (i % 2)-1),
    severity: Factory.each(i => 1 + (i % 3)),
    description: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  });