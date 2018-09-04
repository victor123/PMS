import { Injectable } from '@angular/core';
@Injectable()
export class CommonService {
  constructor() {}
  sortby = (array, object,type) => {
   if(type==="less")
    {
      let j = array.sort(function(a, b) {
          if (a[object] < b[object]) {
            return -1;
          } else if (a[object] > b[object]) {
            return 1;
          } else {
            return 0;
          }
        });
        return j;
      }
      else
      {
        let j = array.sort(function(a, b) {
          if (a[object] > b[object]) {
            return -1;
          } else if (a[object] < b[object]) {
            return 1;
          } else {
            return 0;
          }
        });
        return j;
      }

  }
  search = (items, searchText) => {
      if (!items) return [];
      if (!searchText) return items;
      searchText = searchText.toLowerCase();
      return items.filter(it => {
        return it.pilotCode.toLowerCase().includes(searchText);
      });
  }
  get
  get300dates=()=>{
    let j = new Date()
    let s = j.getMinutes();
    let arr = []
    for (let i = 2; i >= 0; i--) {
        j = new Date()
        let k = j.getMinutes() % 5
        if (k != 0) {
            j.setMinutes(j.getMinutes() + (5 - k))
            j.setMinutes(j.getMinutes() + (i * 5))
        } else {
            let val = (i * 5)
            j.setMinutes(j.getMinutes() + val)
        }
        let min:any=j.getMinutes();
        if(min==0)
            min="00"
        else if(min==5)
            min="05"

        if (i != 0) {
             arr.push({text:"+ " + (i + 1) * 5 + " " + j.getDate() + "/" + (j.getMonth() + 1) + "/" + j.getFullYear() + " " + j.getHours() + ":" + min})
        } else {
            arr.push({text:"Now " + (i + 1) * 5 + " " + j.getDate() + "/" + (j.getMonth() + 1) + "/" + j.getFullYear() + " " + j.getHours() + ":" + min})
        }
    }
    for (let i = 0; i < 60; i++) {
        j = new Date()
        let k = j.getMinutes() % 5
        if (k != 0) {
            j.setMinutes(j.getMinutes() - k)
            j.setMinutes(j.getMinutes() - (i * 5))
        } else {
            let val = (i * 5)
            j.setMinutes(j.getMinutes() - val)
        }
        let min:any=j.getMinutes();
        if(min==0) 
            min="00"
        else if(min==5)
            min="05"
        arr.push({text:"- " + (i + 1) * 5 + " " + j.getDate() + "/" + (j.getMonth() + 1) + "/" + j.getFullYear() + " " + j.getHours() + ":" + min})


    }
    return arr;
  }
}
