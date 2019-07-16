import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { DeviceService } from '../services/devices.service';
import { DeviceType } from '../models/device-type';
import { DeviceStatus } from '../models/device-status';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  devices: Device[] = [];
  devType = DeviceType;
  DeviceStatus = DeviceStatus;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.deviceService.getDevices()
      .subscribe(devices => this.devices = devices);
  }
}