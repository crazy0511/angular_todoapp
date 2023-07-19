import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  storage: Storage;
  constructor() {
    this.storage = window.localStorage;
    
  }

  set(key:string, value: string): void{
    this.storage[key] = value;
  }

  get(key:string, value: any): void{
    return this.storage[key] || false;
  }

  // cài đặt lại key - value
  setObject(key:string, value:any): void{
    if(!value){
      return;
    }
    this.storage[key] = JSON.stringify(value);
  }

  // Dùng
  getObject(key:string): any{
    return JSON.parse(this.storage[key] || '{}');
  }

  // Dùng
  getValue<T>(key:string): T{
    const obj = JSON.parse(this.storage[key] || null);
    return <T>obj;
  }

  remove(key: string): any{
    this.storage.removeItem(key);
  }

  clear(){
    this.storage.clear();
  }

  get length(): number{
    return this.storage.length;
  }

  get isStorageEmpty(): boolean{
    return this.storage.length === 0; 
  }
}
