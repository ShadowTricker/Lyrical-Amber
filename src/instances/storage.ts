import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, of, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private secureStorageObj: SecureStorageObject;

  constructor(
    private storage: Storage,
    private secureStorage: SecureStorage
  ) { }

  /**
   * storage functions for local-storage
   * @params key: string, value: any
   * @output get function return the value whitch want to get
   * @outpub other functions return true to know that operation success
   */
  public getLocal(key: string): Observable<any> {
    return of(JSON.parse(localStorage.getItem(key)));
  }

  public setLocal(key: string, value: any): Observable<boolean> {
    if (value === undefined || value === null) {
      return this.deleteLocal(key);
    }

    if (typeof value === 'string') {
      value = `"${ value }"`;
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
    return of(true);
  }

  public deleteLocal(key: string): Observable<boolean> {
    localStorage.removeItem(key);
    return of(true);
  }

  public clearLocal(): Observable<boolean> {
    localStorage.clear();
    return of(true);
  }

  /**
   * storage functions for session-storage
   * @params key: string, value: any
   * @output get function return the value whitch want to get
   * @outpub other functions return true to know that operation success
   */
  public getSession(key: string): Observable<any> {
    return of(JSON.parse(sessionStorage.getItem(key)));
  }

  public setSession(key: string, value: any): Observable<boolean> {
    if (value === undefined || value === null) {
      return this.deleteSession(key);
    }

    if (typeof value === 'string') {
      value = `"${ value }"`;
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    sessionStorage.setItem(key, value);
    return of(true);
  }

  public deleteSession(key: string): Observable<boolean> {
    sessionStorage.removeItem(key);
    return of(true);
  }

  public clearSession(): Observable<boolean> {
    sessionStorage.clear();
    return of(true);
  }

  /**
   * storage functions for SQLite DB
   * @params key: string, value: any
   * @output get function return the value whitch want to get
   * @outpub other functions return true to know that operation success
   */
  public setLocalDB(key: string, value: any) {
    return from(this.storage.set(key, value)).pipe(
      tap(res => console.log(res)),
      map(res => true)
    );
  }

  public getLocalDB(key: string) {
    return from(this.storage.get(key));
  }

  public deleteLocalDB(key: string) {
    return from(this.storage.remove(key)).pipe(
      tap(res => console.log(res)),
      map(res => true)
    );
  }

  public clearLocalDB() {
    return from(this.storage.clear()).pipe(
      tap(res => console.log(res)),
      map(res => true)
    );
  }

  /**
   * storage functions for secure-storage
   * @params key: string, value: any
   * @output get function return the value whitch want to get
   * @outpub other functions return true to know that operation success
   */
  public initSecureStorage(storageName: string): void {
    this.secureStorage.create(storageName)
      .then((storage: SecureStorageObject) => {
        this.secureStorageObj = storage;
        return true;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  public getSecure(key: string): Observable<any> {
    return from(this.secureStorageObj.get(key));
  }

  public setSecure(key: string, value: any): Observable<boolean> {
    if (value === undefined || value === null) {
      return this.deleteSecure(key);
    }

    if (typeof value === 'string') {
      value = `"${ value }"`;
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    return from(this.secureStorageObj.set(key, value)).pipe(
      tap(res => console.log(res)),
      map(res => true)
    );
  }

  public deleteSecure(key: string): Observable<boolean> {
    return from(this.secureStorageObj.remove(key)).pipe(
      tap(res => console.log(res)),
      map(res => true)
    );
  }

  public clearSecure(): Observable<boolean> {
    return from(this.secureStorageObj.clear()).pipe(
      tap(res => console.log(res)),
      map(res => true)
    );
  }
}
