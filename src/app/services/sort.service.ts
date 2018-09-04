import { Injectable } from '@angular/core';
@Injectable()
export class SortService {
  constructor() {}
  sortby = (array, object,type) => {
   if(type==="less")
    {
      var j = array.sort(function(a, b) {
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
        var j = array.sort(function(a, b) {
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
      console.log(searchText,items)
      searchText = searchText.toLowerCase();
      return items.filter(it => {
        return it.pilotCode.toLowerCase().includes(searchText);
      });
  }
}
