import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDeviceComponent }      from './add-device/add-device.component';
import  {DashboardComponent} from './dashboard/dashboard.component';
import  {DeviceDetailsComponent} from './device-details/device-details.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{path: 'add', component: AddDeviceComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'detail/:id', component:DeviceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
