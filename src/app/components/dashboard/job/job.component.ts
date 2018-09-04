import { Component, OnInit, Inject, OnChanges, AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { process, State } from '@progress/kendo-data-query';
import { IntlService } from '@progress/kendo-angular-intl';
import { PilotDemandDataService } from '../../../services/pilotdemadchart.service';
import { CategoriesService } from '../../../services/northwind.service';
import { GridComponent, GridDataResult, DataStateChangeEvent,PageChangeEvent  } from '@progress/kendo-angular-grid';
import { JobDemandModel, JobDemandFilterModel } from '../../../shared/modals/form.model';
import { Observable } from 'rxjs/Observable';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import * as moment from 'moment';
@Component({
  selector: 'job-grid',
  templateUrl: './job.component.html',
  styleUrls: [],
  providers: [PilotDemandDataService, CategoriesService]
})
export class JobComponent {
  view: Observable < GridDataResult > ;
  public state: State = {
    skip: 0,
    take: 5,
    sort:[],
    filter: {
      logic: "and",
      filters: []
    }
  };
  public sort: SortDescriptor[] = [];
  public editDataItem: JobDemandModel;
  public jobDemandFilterModel: JobDemandFilterModel;
  public isNew: boolean;
  public defaultItem: { text: string, value: string } = { text: "Vessel", value: "Vessel" };
  public listItems: Array<{ text: string, value: any }> = [
        { text: "Company", value: "Customer" },
        { text: "Vessel", value: "Vessel" },

    ];
  public gridDataa: any[] = [];
  public size: any[] = [5, 15, 20, 25];
  public steps: any = { hour: 2, minute: 5 };
  public filterForm: FormGroup;
  public gridData: GridDataResult;
  public gridView: GridDataResult;
  public buttonCount: number = 5;
  public info: boolean = true;
  public types: 'numeric' | 'input' = 'numeric';
  public pageSizes: boolean = true;
  public previousNext: boolean = true;
   public selectedItem = this.defaultItem;
   public notvalid :boolean=false;
  public min: Date = new Date(2017, 1, 1);
  public max: Date = new Date(2018, 1, 1);
  public min1: Date = new Date(2017, 1, 1);
  public max1: Date = new Date(2018, 1, 1);
@ViewChild('dropdown') el:ElementRef;
  data:any[];
  public totalCount: any;
  constructor(public services: PilotDemandDataService, public service: CategoriesService, public fb: FormBuilder, public intl: IntlService) {
    this.view = service;
    // this.service.query(this.state);
    this.filterForm = fb.group({
      'type': '',
      'name': '',
      'fromDate': ['', Validators.compose([Validators.required])],
      'toDate': ['', Validators.compose([Validators.required])]
    })
    this.jobDemandFilterModel = new JobDemandFilterModel();
  }
  fromDate: Date = new Date();
  toDate: Date = new Date();
  type: any = '';
  name: '';
   public pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.loadData();
    }
  public value: Date = new Date();
  public exampleFlag = true;
  ngOnInit() {
    this.loadGridData({
      'type': '',
      'name': '',
      'fromDate': new Date(),
      'toDate': new Date()
    });
    let setVal = this.exampleFlag;
    this.valChange(setVal);
   // this.el['value']="Select Customer/Vessel"

  }
  // public today = new Date();
  // public max: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;

    this.gridData = process(this.gridDataa,this.state);
    console.log(state)
  }
  public loadGridData(jobDemandFilterModel: JobDemandFilterModel) {
    jobDemandFilterModel.fromDate = this.formatValue(jobDemandFilterModel.fromDate);
    jobDemandFilterModel.toDate = this.formatValue(jobDemandFilterModel.toDate);
    console.log(jobDemandFilterModel);
    this.services.jobtableData(jobDemandFilterModel).subscribe((res) => {
      this.gridDataa = res;
      this.totalCount = res.length;
      console.log(this.state)
      this.gridData = process(res, this.state);
      this.loadData();
    })
  }
  public editHandler(ev: any) {
    console.log(ev.dataItem);
    let data = ev.dataItem;
    data.moduleCode = 'psds';
    this.services.pilotDetailById(data).subscribe((res) => {
      console.log(res.jobDetails);
        let contDetail = res.customerAgentName;
          if ((res.agentContactDetails != null) && (contDetail != null)) {
            res['contDetail'] = contDetail +' / '+ res.agentContactDetails;
          } else if (contDetail != null) {
            res['contDetail'] = contDetail+' / '+ '';
          } else if(res.agentContactDetails != null){
            res['contDetail'] = ''+' / '+ res.agentContactDetails;
          }  else{
            res['contDetail'] = ''+' / '+'';
          }
        this.editDataItem = res.jobDetails;
        this.isNew = true;
        // console.log("edit btn" , this.isNew)
    });

    // let contDetail = dataItem.customerAgentName;
    // if ((dataItem.agentContactDetails != null) && (contDetail != null)) {
    //   dataItem['contDetail'] = contDetail +' / '+ dataItem.agentContactDetails;
    // } else if (contDetail != null) {
    //   dataItem['contDetail'] = contDetail+' / '+ '';
    // } else if(dataItem.agentContactDetails != null){
    //   dataItem['contDetail'] = ''+' / '+ dataItem.agentContactDetails;
    // }  else{
    //   dataItem['contDetail'] = ''+' / '+'';
    // }
    
    // this.editDataItem = dataItem;
    // this.isNew = true;

  }
  public cancelHandler(evn: any) {
    this.editDataItem = undefined;
    this.isNew = false;
  }
  public saveHandler() {
    //this.editDataItem = undefined;
  };
   message: any="Vessel or Company name";
  valChange(value){
    let control=this.filterForm.get('name');
    // control.disable();
    if(value==1){
      control.disable();
      this.notvalid=false;
      control.setValue('');
      this.message="Vessel or Company name";
    }
    else if(value==2){
      control.enable();
      control.setValue('');
      this.notvalid=false;
      this.message="Company Name"
    }
    else if(value==3){
      control.enable();
      control.setValue('');
      this.notvalid=false;
      this.message="Vessel Name"
    }
  }

  onSearchChange(event)
  {
    // console.log(event)
    this.notvalid=false;
  }
  public onFilter(value: any) {
    console.log(value)
    if(value.type==="vessel" || value.type==="customer")
    {
      console.log(value.type)
      if(value.name===undefined || value.name==="")
    {
      console.log(value.name)
        this.notvalid=true
        return;
    }
    else
      this.notvalid=false;
    } else
      this.notvalid=false;
      value.fromDate = this.formatValue(value.fromDate);
      value.toDate = this.formatValue(value.toDate);
      this.state.skip=0;
      this.state.take=5;
      this.gridData = process(this.gridDataa, this.state)
      this.services.filterService(value, (res) => {
      this.state.skip=0;
      this.state.take=5;
      this.state.sort=[];
      this.pageSize=5;
      this.gridData = process(res, this.state);
      this.gridDataa = res;
      this.totalCount = res.length;
    });
  }
  public formatTime(value ? : Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  }
  public formatValue(value ? : Date): string {
    return value ? `${this.intl.formatDate(value, 'dd-MM-yyyy')}` : '';
  }
  public pageSize: number = 5;
  public skip: number = 0;
  onReset() {
    // let control=this.filterForm.get('name');
    // control.enable();
    let setVal = this.exampleFlag;
    this.valChange(setVal);
    this.filterForm.reset({
      'type': '',
      'name': '',
      'fromDate': new Date(),
      'toDate': new Date()
    });
    this.message = "Vessel or Company name";
    this.filterForm.value.fromDate = this.formatValue(this.filterForm.value.fromDate);
    this.filterForm.value.toDate = this.formatValue(this.filterForm.value.toDate);
    this.services.filterService(this.filterForm.value, (res) => {
      this.state.skip=0;
      this.state.take=5;
      this.state.sort=[];
      this.pageSize=5;
      this.gridData = process(res, this.state);
      this.gridDataa = res;
      this.totalCount = res.length;
      this.loadData();
    });
    console.log(this.filterForm.value)
    this.notvalid = false;
  }
  doSomething(value: any) {
    this.pageChange(value)
  }
  public products: any[] = Array(100).fill({}).map((x, idx) => ({
    "ProductID": idx,
    "ProductName": "Product" + idx,
    "Discontinued": idx % 2 === 0
  }));
  public loadData(): void {
    var data1:any;
    console.log(this.state.sort)
    if (this.state.sort !== [] ) {
      data1=orderBy(this.gridDataa, this.state.sort)
      console.log(data1);
    } else {
      data1 = this.gridDataa;
    }
    console.log('data1', data1);
    this.gridData = {
      data: data1.slice(this.skip, this.skip + this.pageSize),
      total: this.gridDataa.length
    };
  }
  public startChange() {
      var startDate = this.fromDate,
        endDate = this.toDate;
      if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        this.min1 = startDate;
        this.max1 = new Date(startDate.getTime() + (31 * 24 * 60 * 60 * 1000));
        this.toDate=this.min1
    }
  }
}
