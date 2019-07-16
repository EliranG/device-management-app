import { Component, OnInit, Input } from '@angular/core';
import {Device} from '../models/device';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DeviceService }  from '../services/devices.service';
import { EventSevirity } from '../models/event-severity';
import { DeviceType } from '../models/device-type';
import { DeviceStatus } from '../models/device-status';
import { EventType } from '../models/event-type';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {

  device:Device;
  //for enum convert:
  EventSevirity = EventSevirity;
  devType = DeviceType;
  DeviceStatus = DeviceStatus;
  EventType = EventType;
  
  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getDevice();
  }

  getDevice(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.deviceService.getDevice(id)
      .subscribe(device => this.device = device);
  }

  save(): void{
    this.deviceService.updateDevice(this.device)
    .subscribe(()=> this.goBack());
  }
  
  goBack(): void{
    this.location.back();
  }

}
