import { Injectable } from '@angular/core';
import {Device} from '../models/device';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  
  private devicesUrl = 'api/devices';  // URL to web api

  constructor(private messageService: MessageService,
    private http:HttpClient) { }

    
  getDevices(): Observable<Device[]> {

    return this.http.get<Device[]>(this.devicesUrl).
  pipe(
    tap(_ => this.log('fetched Devices')),
    catchError(this.handleError<Device[]>('getDevices', []))
      );
    }

/** GET Device by id. Will 404 if id not found */
getDevice(id: number): Observable<Device> {
  const url = `${this.devicesUrl}/${id}`;
  return this.http.get<Device>(url).pipe(
    tap(_ => this.log(`fetched Device id=${id}`)),
    catchError(this.handleError<Device>(`getDevice id=${id}`))
  );
}

/** PUT: update the Device on the server */
updateDevice (Device: Device): Observable<any> {
  return this.http.put(this.devicesUrl, Device, httpOptions).pipe(
    tap(_ => this.log(`updated Device id=${Device.id}`)),
    catchError(this.handleError<any>('updateDevice'))
  );

}

/** POST: add a new Device to the server */
addDevice (Device: Device): Observable<Device> {
  return this.http.post<Device>(this.devicesUrl, Device, httpOptions).pipe(
    //tap((newDevice: Device) => this.log(`added Device w/ id=${newDevice.id}`)),
    catchError(this.handleError<Device>('addDevice'))
  );
}
    
    /** Log a DeviceService message with the MessageService */
private log(message: string) {
  this.messageService.add(`DeviceService: ${message}`);

  
}
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
