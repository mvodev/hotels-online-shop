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

  addItem = (data:CardTypeProps) => {
    const oldData = this.getItems();
    oldData?.push(data);
  }
}

const ls = new LocalStorage();

export default ls;