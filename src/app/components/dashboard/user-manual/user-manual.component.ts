import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { PilotDemandDataService } from '../../../services/pilotdemadchart.service';
import { PilotEffectiveFilerModel } from '../pilot-effective/form.model';
var startTime: any, endTime: any
@Component({
  selector: 'user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: [],
  providers: [PilotDemandDataService]
})
export class UserManualComponent {
  private pilotEffectiveFilerModel: PilotEffectiveFilerModel;
  public filtersForm: FormGroup;
  public date;
  public steps: any = { hour: 1, minute: 5 };
  public startTime: any;
  public endTime: any;
  public min: Date = new Date(2017, 1, 1);
  public max: Date = new Date(2018, 1, 1);
  public min1: Date = new Date(2017, 1, 1);
  public max1: Date = new Date(2018, 1, 1);
  public data: any = { v1: new Date(), v2: new Date() }
  public pieData: any = [];
  val = 0;
  fromDate:Date = new Date();
  toDate:Date = new Date();
  public noData: boolean;
  constructor(private service: PilotDemandDataService, public fb: FormBuilder, private intl: IntlService) {

    this.filtersForm = fb.group({
      'fromDate': ['', Validators.compose([Validators.required])],
      'toDate': ['', Validators.compose([Validators.required])],
      'fromTime': ['', Validators.compose([Validators.required])],
      'toTime': ['', Validators.compose([Validators.required])],
    })
    this.pilotEffectiveFilerModel = new PilotEffectiveFilerModel();
  }
  public startChange() {
    if (this.val === 0) {
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
  }
  // public endChange() {
  //   var endDate = this.data.v2,
  //     startDate = this.data.v1;
  //     console.log(endDate)
  //   if (endDate) {
  //     endDate = new Date(endDate);
  //     endDate.setDate(endDate.getDate());
  //     this.max = endDate;
  //     this.min = new Date(endDate.getTime() - (31 * 24 * 60 * 60 * 1000));

  //   }
  //}
  ngOnInit() {
    this.date = "";
    var date=new Date(),data;
    var d = new Date(); // for now
    let mouringsrt: Date, afternoonsrt: Date, niitsrt: Date, mouringlast: Date, afternoonlast: Date, niitlast: Date;
    mouringsrt = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 07:30");
    mouringlast = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 14:30");
    afternoonsrt = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 14:30");
    afternoonlast = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 23:30");
    niitsrt = new Date(d.getMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getFullYear() + " 23:30");
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
    // this.startChange()

    this.loadData(this.fromDate, this.startTime, this.toDate, endTime);
    console.log(this.startTime);
    // data=[{fromDate:date,toDate:date,fromTime:startTime,toTime:endTime}]
    // this.filtersForm.setValue(data);
  }
  public loadData(fromDate,fromtime,toDate,totime) {
      fromDate = this.formatValue(fromDate);
      toDate = this.formatValue(toDate);
      fromtime = this.formatTime(fromtime);
      totime = this.formatTime(totime);
      console.log(fromDate, toDate, fromtime, totime);
    this.service.userManualData(fromDate,fromtime,toDate,totime).subscribe((res) => {
      if (res.length > 0) {
        this.noData= false;
        this.pieData = this.convertPercentage(res); 
      } else {
        this.noData = true;
        console.log("null res",res);
      }
    })
  }
  public onFilter(value: any, valid: boolean) {
    value.fromDate = this.formatValue(value.fromDate);
    value.toDate = this.formatValue(value.toDate);
    value.fromTime = this.formatTime(value.fromTime);
    value.toTime = this.formatTime(value.toTime);
    if (valid) {
      this.service.userManualFilerData(value, (res) => {
        console.log(res);
        if (res.length > 0) {
          this.noData= false;
          this.pieData = this.convertPercentage(res); 
        } else {
          this.noData = true;
          console.log("null res",res);
        }
      });
    }
  }
  private formatValue(value ? : Date): string {
    return value ? `${this.intl.formatDate(value, 'dd-MM-yyyy')}` : '';
  }
  private formatTime(value ? : Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  }
  public convertPercentage(value: any) {
    let total = 0,
      per = 0,
      dummyData = [];
    dummyData = JSON.parse(JSON.stringify(value));
    dummyData.forEach((val, key) => {
      total += val.count
      console.log(key, val.count, total);
    }); // "A 1", "B 2"
    dummyData.map(value => {
      per = (value.count / total) * 100
      value.per = per.toFixed(0);
    })
    dummyData[0].category = 'Manually Adjusted Jobs';
    dummyData[1].category = 'Engine Planned Jobs';
    // dummyData[2].category = 'Jobs';
    dummyData[0].color = 'rgb(76, 175, 80)';
    dummyData[1].color = 'rgb(63, 81, 181)';
    // dummyData[2].color = 'rgb(3, 169, 244)';
    return dummyData
  }
  onReset() {
    // this.loadData();
    // var date=new Date(),data;

    // data={fromDate:date,toDate:new Date((new Date().getTime()+ (31 * 24 * 60 * 60 * 1000))),fromTime:startTime,toTime:endTime}
    // console.log(data)
    // this.toDate = new Date()
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
  }
  public category: ['Jobs', 'Travel', 'Unavilable']
  public labelContent(e: any): string {
    return `${ e.category }\n ${ e.dataItem.count } (${e.value}%)`;
  }
}
