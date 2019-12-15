import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // local storage area
  public getLocal(key: string): any {
    return localStorage.getItem(key);
  }

  public setLocal(key: string, value: any): void {
    if (value !== null && typeof value === 'object') {
      value = JSON.stringify(value);
    }
    if (value === undefined || value === null) {
      this.deleteLocal(key);
      return;
    }
    localStorage.setItem(key, value);
  }

  public deleteLocal(key: string): void {
    localStorage.removeItem(key);
  }

  public clearLocal() {
    localStorage.clear();
  }

  // session storage area
  public getSession(key: string): any {
    return sessionStorage.getItem(key);
  }

  public setSession(key: string, value: any): void {
    if (value !== null && typeof value === 'object') {
      value = JSON.stringify(value);
    }

    if (value === undefined || value === null) {
      this.deleteSession(key);

      return;
    }

    sessionStorage.setItem(key, value);
  }

  public deleteSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clearSession() {
    sessionStorage.clear();
  }
}
