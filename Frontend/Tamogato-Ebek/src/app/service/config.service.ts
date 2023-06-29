import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  userTableColumns: ITableColumn[] = [
    //{ title: 'ID', key: '_id' },
    { title: 'Név', key: 'name' },
    { title: 'Város', key: 'city' },
    { title: 'Email', key: 'email' },
    //{ title: 'Jelszó', key: 'password' },
    { title: 'Kor', key: 'age' },
    { title: 'Összeg', key: 'amount' },
    { title: 'Szerepkör', key: 'role' },
  ];

  aidTableColumns: ITableColumn[] = [
    { title: 'ID', key: '_id' },
    { title: 'Cím', key: 'title' },
    { title: 'Leírás', key: 'details' },
    { title: 'Dátum', key: 'date' },
    { title: 'Összeg', key: 'amount' },
    { title: 'Összesen', key: 'collected' },
    { title: 'Aktív', key: 'active' },
  ];

  dogTableColumns: ITableColumn[] = [
    { title: 'ID', key: '_id' },
    { title: 'Név', key: 'name' },
    { title: 'Fajta', key: 'breed' },
    { title: 'Kor', key: 'age' },
    { title: 'Tanul még?', key: 'learning' },
    { title: 'Bevethető?', key: 'deployable' },
    { title: 'Kép elérési út', key: 'url' },
  ];

  successTableColumns: ITableColumn[] = [
    { title: 'ID', key: '_id' },
    { title: 'Cím', key: 'title' },
    { title: 'Helyszín', key: 'place' },
    { title: 'Dátum', key: 'date' },
    { title: 'Sikeres?', key: 'success' },
    { title: 'Részletek', key: 'details' },
  ];

  id: number = 1;
  title: string = 'Elveszett idős ember';
  place: string = 'Budapest';
  date: string = '7/24/2021';
  success: boolean = true;
  details: string = 'Egy elveszett idős férfi';

  constructor() {}
}
