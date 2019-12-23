import Dexie from 'dexie';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IIdb {
  name: string;
  value: string;
}

export class IndexedDbLibService<T> extends Dexie {
  public friends: Dexie.Table<T, number>; // id is number in this case
  private getSubj: Subject<IIdb[]>;
  constructor(private dbName: string) {
    super(dbName);
    this.getSubj = new Subject();
    this.version(1).stores({
      data: 'name,value'
    });
    this.friends = this.table('data');
  }
  //-----------------------------------------------------
  public sendToDB(dataArr: T[]) {
    dataArr.forEach((item: T) => {
      this.friends.put(item);
    });
  }
  //-----------------------------------------------------
  public getFromDB(nameW: string[]) {
    this.getSubj = new Subject();
    const result: any = [];
    let count: number = nameW.length;
    nameW.forEach((item: string) => {
      this.friends.get({ name: item }).then((data) => {
        result.push(data || { name: item, value: undefined });
        count > 1 ? (count -= 1) : this.getSubj.next(result);
      });
    });
    return this.getSubj;
  }
}

/********************************************************************/
/** получение данных для  всех виджетов*/
/********************************************************************/
export const getWidgetFromIndexedDb = (sName: string, sWidgetName: string) =>
  new IndexedDbLibService(sName)
    .getFromDB([sWidgetName])
    .pipe(map((data) => data.map((i) => JSON.parse(i.value))[0]));
