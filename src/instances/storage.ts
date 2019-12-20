import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // local storage area
  public getLocal(key: string): any {
    console.log(localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key));
  }

  public setLocal(key: string, value: any): void {
    if (value === undefined || value === null) {
      this.deleteLocal(key);
      return;
    }

    if (typeof value === 'string') {
      value = `"${value}"`;
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
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
  public getSession<T>(key: string): T {
    return JSON.parse(sessionStorage.getItem(key)) as T;
  }

  public setSession(key: string, value: any): void {
    if (value === undefined || value === null) {
      this.deleteSession(key);
      return;
    }

    if (typeof value === 'string') {
      value = `"${value}"`;
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
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
