import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

export abstract class NorthwindService extends BehaviorSubject<GridDataResult> {
    private BASE_URL: string = 'http://172.16.1.32:7001/ms_mres_dashboard_fe/dashboard/ShowPilotageDetails';
    constructor(private http: HttpClient,protected tableName: string) 
    {
        super(null);
    }
    public query(state: any): void {
        console.log(state,0)
        this.fetch(this.tableName, state)
            .subscribe(x => super.next(x));
    }
    protected fetch(tableName: string, state: any): Observable<GridDataResult> {
        let j = toODataString(state);
        console.log(j)
        var k=j.split("$").join("")
        let params = "";
        params= 'type='+state.filter.filters.type;
        if(state.filter.filters.name!=undefined)
        params+='&name='+state.filter.filters.name;
        params+='&fromDate='+state.filter.filters.fromDate;
        params+='&toDate='+state.filter.filters.toDate;
        console.log(params)
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const queryStr = `${params}&${k}&count=true`;
        console.log(queryStr)

        return this.http.get(`${this.BASE_URL}?${queryStr}`, {headers: headers})

            .map(response => { console.log(response)
                var array=[]
                if(response['value']!==null) {
                    array=response['value']
                }
            return <GridDataResult>{
                data: array,
                total: parseInt(response["count"], 10)
            } 
        });
    }
    private getHeader() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}

@Injectable()
export class ProductsService extends NorthwindService {
    constructor(http: HttpClient) { super(http, "Products"); }

    public queryForCategory({ CategoryID }: { CategoryID: number }, state?: any): void {
      console.log(state,"2")
        this.query(Object.assign({}, state, {
            filter: {
                filters: [{
                    field: "CategoryID", operator: "eq", value: CategoryID
                }],
                logic: "and"
            }
        }));
    }
}

@Injectable()
export class CategoriesService extends NorthwindService {
    constructor(http: HttpClient) { super(http, "Categories") }
}
