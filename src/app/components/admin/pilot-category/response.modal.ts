import { Component, Input } from '@angular/core';
import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { process, State, aggregateBy } from '@progress/kendo-data-query';


@Component({
  selector: 'user-info',
  template: `
      <kendo-grid [data]="delay"
        [pageSize]="state.take"
        [skip]="state.skip" 
        [sort]="state.sort"
        [pageable]="true"
        [scrollable]="'none'" 
        (dataStateChange)="dataStateChange($event)">
        <kendo-grid-column field="vesselName" title="Vessel Name">
        </kendo-grid-column>
        <kendo-grid-column field="previousPriorityCode" title="Previous Priority Code">
        </kendo-grid-column>
        <kendo-grid-column field="updatedPriorityCode" title="Updated Priority Code">
        </kendo-grid-column>
        <kendo-grid-column field="orderNumber" title="Order Number">
        </kendo-grid-column>
        <kendo-grid-column field="cst" title="CST">
        </kendo-grid-column>
      </kendo-grid>
  `
})
export class ResposeComponentCategory {
    public delay: GridDataResult;
    public state: State = {
      skip: 0,
      take: 10,
      filter: {
        logic: "and",
        filters: []
      }
    };
    
    @Input() public data: any[]= [];

    ngOnInit(){
      console.log(this.data);
      this.delay = process(this.data, this.state);
    }
    public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;

      this.delay = process(this.data,this.state);
      console.log(state)
    }

}