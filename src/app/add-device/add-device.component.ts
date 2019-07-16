import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';

import { Device } from '../models/device';
import { DeviceService } from '../services/devices.service';
import { DeviceType } from '../models/device-type';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  devices: Device[];
  deviceForm: FormGroup;
  isSubmitted  =  false;
  successAlert = false;

  public deviceTypes = Object.values(DeviceType).filter(value => typeof value === 'string');

  constructor(private DeviceService: DeviceService,private location: Location, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getDevices();
    this.deviceForm =  this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
      ip: ['', [Validators.required, Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      type: ['', Validators.required]
  });
  }

  getDevices(): void {
    this.DeviceService.getDevices()
        .subscribe(devices => this.devices = devices);
  }

  get deviceControls() { return this.deviceForm.controls; }

  addDevice(){
    console.log(this.deviceForm.value);
    this.isSubmitted = true;
    if(this.deviceForm.invalid){
      return;
    }
    
    let device = new Device(this.deviceForm.value.name, this.deviceForm.value.ip, this.deviceForm.value.type);
   this.DeviceService.addDevice(device)
   .subscribe(device => {
     this.devices.push(device);
     this.successAlert = true;
     setTimeout(() => {
      this.location.back();
     }, 1000);
   });

  }

  goBack(): void{
    this.location.back();
  }
}