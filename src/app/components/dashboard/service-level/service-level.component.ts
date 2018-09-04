import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State, aggregateBy } from '@progress/kendo-data-query';
import { IntlService } from '@progress/kendo-angular-intl';
import { ServiceLevelFilterModel } from '../../../shared/modals/form.model';
import { PilotDemandDataService } from '../../../services/pilotdemadchart.service'
/**
 * This class represents the toolbar component.
 */
 var startTime: any, endTime: any
@Component({
  selector: 'service-level',
  templateUrl: './service-level.component.html',
  styleUrls: [],
  providers: [PilotDemandDataService]
})
export class ServiceLevelComponent implements OnInit {
  public onShow: boolean;
  public filterForm: FormGroup;
  public modelclass = ServiceLevelFilterModel;
  public steps: any = { hour: 1, minute: 5 };
  constructor(public service: PilotDemandDataService, public fb: FormBuilder, public intl: IntlService) {
    this.filterForm = fb.group({
      'startDate': ['', Validators.compose([Validators.required])],
      'endDate': ['', Validators.compose([Validators.required])],
      'startTime': ['', Validators.compose([Validators.required])],
      'endTime': ['', Validators.compose([Validators.required])],
    })
    // this.modelclass = new ServiceLevelFilterModel();
  }
  startDate: Date =new Date();
  endDate: Date =new Date();
  public startTime: any;
  public endTime: any;
  public min: Date = new Date(2017, 1, 1);
  public max: Date = new Date(2018, 1, 1);
  public min1: Date = new Date(2017, 1, 1);
  public max1: Date = new Date(2018, 1, 1);
  ngOnInit() {
    var d = new Date(); // for now
    let mouringsrt: Date, afternoonsrt: Date, niitsrt: Date, mouringlast: Date, afternoonlast: Date, niitlast: Date;
    mouringsrt = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 07:30");
    mouringlast = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 14:30");
    afternoonsrt = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 14:30");
    afternoonlast = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 22:30");
    niitsrt = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 22:30");
    niitlast = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 07:30");
    niitlast = new Date(niitlast.setDate(niitlast.getDate() + 1));
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    if (mouringsrt <= d && mouringlast > d) {
      startTime = mouringsrt;
      endTime = mouringlast;
    } else if (afternoonsrt <= d && afternoonlast > d) {
      startTime = afternoonsrt;
      endTime = afternoonlast;
    } else if (niitsrt <= d && niitlast > d) {
      startTime = niitsrt;
      endTime = niitlast;
    }
    this.startTime = startTime;
    this.endTime = endTime;
    this.loadData(this.startDate, startTime, this.endDate, endTime)
    // this.onShow = false;
    // this.startChange();
  }
  public loadData(startDate, fromtime, endDate, totime){
    startDate = this.formatValue(this.startDate);
    endDate = this.formatValue(this.endDate);
    fromtime = this.formatTime(this.startTime);
    totime = this.formatTime(this.endTime);
    console.log("current time ::", startDate,fromtime, endDate, totime);
    this.service.serviceLevelData(startDate, fromtime, endDate, totime)
      .subscribe((res) => {
        this.gridDataa = res;
        console.log("respose:",this.gridDataa);
        res.forEach((key, index) => {
          if ((index != 1 && key.efficiency1 == null)|| (index != 1 && key.efficiency1 == 0)) {
            key.efficiency1 = 'NA';
          } else if (index == 1 && key.efficiency1 == 0) {
            key.efficiency1 = '-';
          } else{
            key.efficiency1 = key.efficiency1 + '%';
          }
          if ((index != 0 && key.efficiency2 == null)||(index != 0 && key.efficiency2 == 0)) {
            key.efficiency2 = 'NA';
          } else if (index == 0 && key.efficiency2 == 0) {
            key.efficiency2 = '-';
          } else{
            key.efficiency2 = key.efficiency2 + '%';
          }
          if ((index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency3 == null)||index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency3 == 0) {
            key.efficiency3 = 'NA';
          } else if ((index == 2 && key.efficiency3 == 0) || (index == 3 && key.efficiency3 == 0) || (index == 4 && key.efficiency3 == 0) || (index == 5 && key.efficiency3 == 0) || (index == 6 && key.efficiency3 == 0) || (index == 7 && key.efficiency3 == 0) || (index == 8 && key.efficiency3 == 0) || (index == 9 && key.efficiency3 == 0)) {
            key.efficiency3 = '-';
          } else{
            key.efficiency3 = key.efficiency3 + '%';
          }
          if ((index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency4 == null)||(index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency4 == 0)) {
            key.efficiency4 = 'NA';
          } else if ((index == 2 && key.efficiency4 == 0) || (index == 3 && key.efficiency4 == 0) || (index == 4 && key.efficiency4 == 0) || (index == 5 && key.efficiency4 == 0) || (index == 6 && key.efficiency4 == 0) || (index == 7 && key.efficiency4 == 0) || (index == 8 && key.efficiency4 == 0) || (index == 9 && key.efficiency4 == 0)) {
            key.efficiency4 = '-';
          } else{
            key.efficiency4 = key.efficiency4 + '%';
          }
          // console.log('val::',key)
        });
      })
  }
  public gridDataa: any[] = [];
  public aggregates: any[] = [{ field: 'efficiency1', aggregate: 'sum' }];
  public state: State = {
    skip: 0,
    take: 5
  };
  public red: boolean;
  public none: boolean;
  public onFilter(value: any) {
    let endDate = this.formatValue(value.endDate);
    let endTime = this.formatTime(value.endTime);
    let startDate = this.formatValue(value.startDate);
    let startTime = this.formatTime(value.startTime);
    this.onShow = true;
    console.log(value);
    // if (valid) {
      this.service.serviceLevelData(startDate, startTime, endDate, endTime).subscribe((res) => {
        this.gridDataa = res;
        console.log("respose:", this.gridDataa);
        res.forEach((key, index) => {
          if ((index != 1 && key.efficiency1 == null)|| (index != 1 && key.efficiency1 == 0)) {
            key.efficiency1 = 'NA';
          } else if (index == 1 && key.efficiency1 == 0) {
            key.efficiency1 = '-';
          } else{
            key.efficiency1 = key.efficiency1 + '%';
          }
          if ((index != 0 && key.efficiency2 == null)||(index != 0 && key.efficiency2 == 0)) {
            key.efficiency2 = 'NA';
          } else if (index == 0 && key.efficiency2 == 0) {
            key.efficiency2 = '-';
          } else{
            key.efficiency2 = key.efficiency2 + '%';
          }
          if ((index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency3 == null)||(index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency3 == 0)) {
            key.efficiency3 = 'NA';
          } else if ((index == 2 && key.efficiency3 == 0) || (index == 3 && key.efficiency3 == 0) || (index == 4 && key.efficiency3 == 0) || (index == 5 && key.efficiency3 == 0) || (index == 6 && key.efficiency3 == 0) || (index == 7 && key.efficiency3 == 0) || (index == 8 && key.efficiency3 == 0) || (index == 9 && key.efficiency3 == 0)) {
            key.efficiency3 = '-';
          } else{
            key.efficiency3 = key.efficiency3 + '%';
          }
          if ((index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency4 == null)||(index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency4 == 0)) {
            key.efficiency4 = 'NA';
          } else if ((index == 2 && key.efficiency4 == 0) || (index == 3 && key.efficiency4 == 0) || (index == 4 && key.efficiency4 == 0) || (index == 5 && key.efficiency4 == 0) || (index == 6 && key.efficiency4 == 0) || (index == 7 && key.efficiency4 == 0) || (index == 8 && key.efficiency4 == 0) || (index == 9 && key.efficiency4 == 0)) {
            key.efficiency4 = '-';
          } else{
            key.efficiency4 = key.efficiency4 + '%';
          }
          // console.log('val::',key)
        });
      })
    // }
  }
    public startChange() {
      var startDate = this.startDate,
        endDate = this.endDate;
      if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        this.min1 = startDate;
        this.max1 = new Date(startDate.getTime() + (31 * 24 * 60 * 60 * 1000));
        this.endDate=this.max1
    }
  }
  // public data = [];
  // public gridData: any = process(this.data, this.state);
  // public total: any = aggregateBy(this.data, this.aggregates);
  // public dataStateChange(state: DataStateChangeEvent): void {
  //   if(state && state.group){
  //     state.group.map(group => group.aggregates = this.aggregates);
  //   }
  //   this.state = state;
  //   this.gridData = process(this.data, this.state);
  //   console.log('this.gridData', this.gridData)
  // }
  public formatTime(value ? : Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  }
  public formatValue(value ? : Date): string {
    return value ? `${this.intl.formatDate(value, 'dd-MM-yyyy')}` : '';
  }
  //   public loadGridData(): void {
  //   this.gridData = {
  //     data: this.gridDataa.slice(this.skip, this.skip + this.pageSize),
  //     total: this.gridDataa.length
  //   };
  public onReset() {
    // var date = new Date(), data;
    // data={startDate:new Date(),endDate:new Date((new Date().getTime()+ (31 * 24 * 60 * 60 * 1000))),startTime:startTime,endTime:endTime}
    this.filterForm.reset({
      'startDate': new Date(),
      'endDate': new Date(),
      'startTime': this.startTime,
      'endTime': this.endTime,
    });
    let endDate = this.formatValue(this.filterForm.value.endDate);
    let endTimes = this.formatTime(this.filterForm.value.endTime);
    let startDate = this.formatValue(this.filterForm.value.startDate);
    let startTimes = this.formatTime(this.filterForm.value.startTime);
    console.log('reset form value::',this.filterForm.valid)
    this.onShow = true;
      this.service.serviceLevelData(startDate, startTimes, endDate, endTimes).subscribe((res) => {
        this.gridDataa = res;
        console.log("respose:", this.gridDataa);
        res.forEach((key, index) => {
          if ((index != 1 && key.efficiency1 == null)|| (index != 1 && key.efficiency1 == 0)) {
            key.efficiency1 = 'NA';
          } else if (index == 1 && key.efficiency1 == 0) {
            key.efficiency1 = '-';
          } else{
            key.efficiency1 = key.efficiency1 + '%';
          }
          if ((index != 0 && key.efficiency2 == null)||(index != 0 && key.efficiency2 == 0)) {
            key.efficiency2 = 'NA';
          } else if (index == 0 && key.efficiency2 == 0) {
            key.efficiency2 = '-';
          } else{
            key.efficiency2 = key.efficiency2 + '%';
          }
          if ((index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency3 == null)||index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency3 == 0) {
            key.efficiency3 = 'NA';
          } else if ((index == 2 && key.efficiency3 == 0) || (index == 3 && key.efficiency3 == 0) || (index == 4 && key.efficiency3 == 0) || (index == 5 && key.efficiency3 == 0) || (index == 6 && key.efficiency3 == 0) || (index == 7 && key.efficiency3 == 0) || (index == 8 && key.efficiency3 == 0) || (index == 9 && key.efficiency3 == 0)) {
            key.efficiency3 = '-';
          } else{
            key.efficiency3 = key.efficiency3 + '%';
          }
          if ((index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency4 == null)||(index != 2 && index != 3 && index != 4 && index != 5 && index != 6 && index != 7 && index != 8 && index != 9 && key.efficiency4 == 0)) {
            key.efficiency4 = 'NA';
          } else if ((index == 2 && key.efficiency4 == 0) || (index == 3 && key.efficiency4 == 0) || (index == 4 && key.efficiency4 == 0) || (index == 5 && key.efficiency4 == 0) || (index == 6 && key.efficiency4 == 0) || (index == 7 && key.efficiency4 == 0) || (index == 8 && key.efficiency4 == 0) || (index == 9 && key.efficiency4 == 0)) {
            key.efficiency4 = '-';
          } else{
            key.efficiency4 = key.efficiency4 + '%';
          }
          // console.log('val::',key)
        });
      })
    // this.onShow = false;
  }
}
