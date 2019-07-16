import {EventType} from './event-type';
import { EventSevirity} from './event-severity';

export interface DeviceEvent{
type: EventType;
severity: EventSevirity;
description: string;
}