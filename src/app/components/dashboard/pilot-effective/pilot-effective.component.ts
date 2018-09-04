import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl , Validators} from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { PilotDemandDataService } from '../../../services/pilotdemadchart.service';
import { PilotEffectiveFilerModel } from './form.model';
import * as moment from 'moment';
var startTime: any, endTime: any,da=new Date()
@Component({
  selector: 'pilot-effective',
  templateUrl: './pilot-effective.component.html',
  styleUrls: [],
  providers: [PilotDemandDataService]
})
export class PilotEffectiveComponent {
  public pilotEffectiveFilerModel: PilotEffectiveFilerModel;
  public filtersForm: FormGroup;
  public steps: any = { hour: 1, minute: 5};
  public startTime: any;
  public endTime: any;
  today = new Date();
  time: any;
  public min: Date = new Date(2017, 1, 1);
  public max: Date = new Date(2018, 1, 1);
  public min1: Date = new Date(2017, 1, 1);
  public max1: Date = new Date(2018, 1, 1);
  date: any
  fromDate:Date = new Date();
  toDate:Date= new Date();
  public data: any = { v1: new Date(), v2: new Date() }
  public noData: boolean;
  constructor(public service: PilotDemandDataService, public fb: FormBuilder, public intl: IntlService) {
    this.filtersForm = fb.group({
      'fromDate': ['', Validators.compose([Validators.required])],
      'toDate': ['', Validators.compose([Validators.required])],
      'fromTime': ['', Validators.compose([Validators.required])],
      'toTime': ['', Validators.compose([Validators.required])],
    })
    this.pilotEffectiveFilerModel = new PilotEffectiveFilerModel();
  }
  public pieData: any = [];
  public dummyData: any = [];
  public lodeData: any;
  ngOnInit() {
    this.date = "";
    console.log(this.data)
    var date=new Date(),data;
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
    // this.startChange();

    this.loadData(this.fromDate, startTime, this.toDate, endTime);
    console.log(this.startTime);
  }
    public startChange() {

      var startDate = this.data.v1,
        endDate = this.data.v2;
      if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        this.min1 = startDate;
        this.max1 = new Date(startDate.getTime() + (31 * 24 * 60 * 60 * 1000));
        this.data.v2=this.max1
    }
  }
  public loadData(fromDate,fromtime,toDate,totime) {
    fromDate = this.formatValue(fromDate);
    toDate = this.formatValue(toDate);
    fromtime = this.formatTime(fromtime);
    totime = this.formatTime(totime);
    console.log(fromDate, toDate, fromtime, totime)
    this.service.pilotEffectiveData(fromDate,fromtime,toDate,totime).subscribe((res) => {
      if (res.length > 0) {
        this.noData= false;
        this.pieData = this.convertPercentage(res); 
      } else {
        this.noData = true;
        console.log("null res",res);
       
      }
    })
  }
  public pilotListItems: any[] = [];
  public pilotValues: any = []
  public sectorListItems: any[] = [];
  public sectorValue: any = [];
  public onFilter(value: any) {
    value.fromDate = this.formatValue(value.fromDate);
    value.toDate = this.formatValue(value.toDate);
    value.fromTime = this.formatTime(value.fromTime);
    value.toTime = this.formatTime(value.toTime);
    console.log(value.fromDate);
    
    // if (valid) {
      this.service.pilotEffectiveFilerData(value, (res) => {
        if (res.length > 0) {
        this.noData= false;
        this.pieData = this.convertPercentage(res); 
      } else {
        this.noData = true;
        console.log("null res",res);
       
      }
      });
    // }
    
  }

  public convertPercentage(value: any) {
    let total = 0,
      per = 0,
      dummyData = [];
      console.log(value.length);
      if (value.length == 0) {
         this.noData= true;
      }

      dummyData = JSON.parse(JSON.stringify(value));
      dummyData.forEach((val, key) => {
        total += val.duration
        console.log(key, val.duration, total)
      }); // "A 1", "B 2"
      dummyData.map(value => {
        per = (value.duration / total) * 100
        value.per = per.toFixed(0);
      })
      dummyData[0].category = 'Unavailable';
      dummyData[1].category = 'On Job';
      dummyData[2].category = 'Travel / Idle';
      dummyData[0].color = '#F5A92F';
      dummyData[1].color = '#9EC93B';
      dummyData[2].color = '#EF7D00';
      return dummyData
  }
  public onReset() {
    // var date = new Date(), data;
    // data={fromDate:date,toDate: new Date((new Date().getTime()+ (31 * 24 * 60 * 60 * 1000))),fromTime:startTime,toTime:endTime}
    this.filtersForm.reset({
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'fromTime': this.startTime,
      'toTime': this.endTime,
    });
    this.filtersForm.value.fromDate = this.formatValue(this.filtersForm.value.fromDate);
    this.filtersForm.value.toDate = this.formatValue(this.filtersForm.value.toDate);
    this.filtersForm.value.fromTime = this.formatTime(this.filtersForm.value.fromTime);
    this.filtersForm.value.toTime = this.formatTime(this.filtersForm.value.toTime);
    console.log('reset form value::',this.filtersForm.valid)
    this.service.userManualFilerData(this.filtersForm.value, (res) => {
        if (res.length > 0) {
          this.noData= false;
          this.pieData = this.convertPercentage(res); 
        } else {
          this.noData = true;
          console.log("null res",res);
          this.pieData = [];
        }
      });
    // this.pieData = [];
  }
  private formatTime(value ? : Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  }
  private formatValue(value ? : Date): string {
    return value ? `${this.intl.formatDate(value, 'dd-MM-yyyy')}` : '';
  }
  public labelContent(e: any): string {
    return `${ e.category }\n ${ e.dataItem.duration } (${e.value}%)\n(hrs)`;
  }
}
