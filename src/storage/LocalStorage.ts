import { CardTypeProps } from "../components/card/Card";
import goodsData from "../model/goodsData";

class LocalStorage {
  private KEY = 'online-shop';

  constructor(){
    localStorage.setItem(this.KEY,JSON.stringify(goodsData));
  }

  deleteAll = () => {
    localStorage.setItem(this.KEY,'')
  }

  deleteItem = (barcode:string) => {
    const dataInStorage = this.getItems() ?? [];
    const index = dataInStorage.findIndex(elem => elem.barcode === barcode);
    if (index>-1) {
      dataInStorage.splice(index,1);
    }
    try {
      localStorage.setItem(this.KEY,JSON.stringify(dataInStorage));
    } catch (error) {
      console.error('Cannot delete data from local storage,error while stringify data');
    }
  }

  getItems = () => {
    try {
      const obj =  localStorage.getItem(this.KEY);
      if (obj) {
        return JSON.parse(obj) as Array<CardTypeProps>;
      }
    } catch (error) {
      console.error('cannot get data from local storage');
    }
  }

  getItem = (barcode:string) => {
    try {
      const obj =  localStorage.getItem(this.KEY);
      if (obj) {
        const goods = JSON.parse(obj) as Array<CardTypeProps>;
        return goods.find((product=>product.barcode===barcode));
      }
    } catch (error) {
      console.error('cannot get data from local storage');
    }
  }

  addItem = (data:CardTypeProps) => {
    const oldData = this.getItems();
    if (oldData) {
      oldData?.push(data);
      try {
        const stringToSave = JSON.stringify(oldData);
        localStorage.setItem(this.KEY,stringToSave);
      } catch (error) {
        console.error('Cannot stringify new object');
      }
    }
  }

  replaceItem = (data:CardTypeProps) => {
    this.deleteItem(data.barcode);
    this.addItem(data);
    console.log(this.getItems());
  }
}

const ls = new LocalStorage();

export default ls;