import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private networkStatus = new BehaviorSubject<boolean>(true);

  constructor() {
    this.initializeNetworkListener();
  }

  initializeNetworkListener() {
    Network.addListener('networkStatusChange', (status) => {
      this.networkStatus.next(status.connected && status.connectionType === 'wifi');
    });
  }

  isConnected() {
    return this.networkStatus.asObservable();
  }
}
