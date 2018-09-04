import { Component, OnInit, Inject, OnChanges, AfterViewInit, ViewChild, ElementRef, Output , EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { PilotDemandDataService } from '../../services/pilotdemadchart.service';
import { JobDemandModel, TsdsModel } from '../../shared/modals/form.model';
import 'rxjs/add/operator/map';
/**
* This class represents the toolbar component.
*/
@Component({
	selector: 'sys-notification',
	templateUrl: './sys-notification.component.html',
	styleUrls: [],
	providers: [PilotDemandDataService],
	animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({opacity:0}), //style only for transition transition (after transiton it removes)
        animate(200, style({opacity:1})) // the new state of the transition(after transiton it removes)
      ]),
      transition('* => void', [
        animate(100, style({opacity:0})) // the new state of the transition(after transiton it removes)
      ])
    ])
  ]
})
export class SysNotificationComponent {
  	p: any[]=[1];
	datas: any[]=[] ;
	total: any;
	allCount: any;
	psdsCount: any;
	tsdsCount: any;
	lsdsCount: any;
	isChecked: any;
	checkValue:any[] = [];
	searchText:any;
	public editDataItem: JobDemandModel;
	public tsdsModel: TsdsModel;
	@ViewChild('dropdown') el:ElementRef;
  	constructor( private service: PilotDemandDataService ){}
	public viewMode : any;
	public ngOnInit(){
		this.viewMode = 'all';
		this.loadData();
	}
	public ModuleCodes = [
		{name: 'All', value:'', selected: false},
	    {name: 'PSDS',value:'PSDS', selected: false},
	    {name: 'TSDS',value:'TSDS', selected: false},
	    {name: 'LSDS',value:'LSDS', selected: false}
	];
	notfication: any;
	temData: any= 0;
	public loadData(){
		this.service.sysNotification().subscribe((res) => {
			this.datas = res.notifications;
			this.total = res.totalCount;
			this.allCount = res.totalCount;
			this.psdsCount = res.psdscount;
			this.tsdsCount = res.tsdscount;
			this.lsdsCount = res.lsdscount;
			this.notfication = res;
			console.log(res);			
		})
	}
	onClickNotification(m: any){
		console.log('select user::', m);
		this.service.sysNotificationAlert(m).subscribe((res) => {
			this.datas = res.notifications;
			this.total = res.totalCount;
			this.allCount = res.totalCount;
			this.psdsCount = res.psdscount;
			this.tsdsCount = res.tsdscount;
			this.lsdsCount = res.lsdscount;
			this.notfication = res;
			console.log(res);
			if (res.success === 'Record Updated Successfully') {
				this.loadData();
			}
		})
	}
	onRefresh() {
		this.datas = [];
		this.loadData();
	}
	pageChanged(event: any): void {
	    if (event >= 1) {
	    	this.isChecked = false;
	    	this.checkValue.forEach(key => {
	    		key.state = false;
	    	})
	    	this.checkValue = [];
	    }
	}
	onclick(val: any){
		console.log(this.notfication);
		this.datas = [];
		if (val == '') {
			this.total = this.notfication.totalCount;
		} else if (val == 'PSDS') {
			this.total = this.notfication.psdscount;
		} else if (val == 'TSDS') {
			this.total = this.notfication.tsdscount;
		} else if (val == 'LSDS') {
			this.total = this.notfication.lsdscount;
		} else
		this.total = this.notfication.totalCount;
		// if (val === 'all') {
		// 	this.datas = this.notfication.notifications; 
		// } else {
		// 	this.notfication.notifications.map((data, index) => {
		// 		if (val === data.moduleCode) {
		// 			console.log()
		// 			// this.datas.push(data);
		// 		}
		// 	})
		// }
	}
	checkAll(ev, page) {
		var starting = 0,ending=0,final=0;
			if (page !== 1 && page[0]!==1 ) {
				starting=(page-1)*10
				ending=starting+10
			} else {
				starting=0;
				ending=10
			}
			if (this.datas.length < starting + 10 ) {
				ending = this.datas.length;
			}
			for(let i = starting ; i < ending; i++){
				if (ev.target.checked) {
					this.datas[i].state = true;
					console.log(this.datas[i])
					this.checkValue.push(this.datas[i]);
				} else {
					this.datas[i].state = false;
					this.checkValue.splice(this.checkValue.indexOf(this.datas[i]), 1);
				}
			}
	}
	public data = [];
	public allChecked : boolean;
	check(event){
		//this.total = this.notfication.totalCount;
		console.log(event.target.value);
		this.datas=[]
		if (event.target.value != 'all') {
			if (this.temData == 0) {
				this.datas = [];
				this.temData = 1;
			}
			if (event.target.checked) {
				this.total = this.datas.length;
				this.data.push(event.target.value);
				this.isChecked = false;
			} else {
				this.data.splice(this.data.indexOf(event.target.value),1);
				console.log('uncheck',this.datas)
				this.total = this.datas.length;
			} 
			var data=JSON.parse(JSON.stringify(this.notfication.notifications))
			this.notfication.notifications.map(m => {

				if(this.data.includes(m.moduleCode))
					this.datas.push(m)
			});
			this.total=this.datas.length
			console.log(this.datas)
		} if (event.target.value === 'All') {
			this.datas = this.notfication.notifications;
			this.total = this.datas.length;
		} else {
			this.allChecked = false;
		}
	}
	onDelete(){
		let putData = [];
		this.checkValue.forEach((key , index) =>{
			putData.push(key.notificationId);
		})
		console.log(putData);
		if (putData.length != 0) {
			this.service.delete(putData)
			.subscribe((res) => {
				if (res.success === "Record deleted Successfully") {
					this.checkValue = [];
					this.loadData();
				}
				console.log(res);
			});
		}
	}
	isAllChecked(event: any, val: any) {
		if (event.target.checked) {
			this.checkValue.push(val);
		} else {
			this.checkValue.splice(this.checkValue.indexOf(val), 1);
		}
	   	this.isChecked = this.datas.every(item => {
	   		return item.state;
	   	})
	   // return this.datas.every(_ => _.state);
	}
	public isNew: boolean;
	public active: boolean;
	public isPsds: boolean;
	public cancelHandler(evn: any) {
	    this.editDataItem = undefined;
	    this.isNew=false;
	    this.isPsds= false;
	    console.log('cancel');
	}
	onDetail(val: any){
		this.service.pilotDetailById(val).subscribe((res) => {
			console.log(res);
		});
	}
	public editHandler(ev: any) {
	    this.service.pilotDetailById(ev).subscribe((res) => {
			console.log(res.jobDetails);
			if (res.module == 'PSDS') {
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
	    		console.log("edit btn" , this.isNew)
			} else if (res.module == 'TSDS') {
				this.isNew = false;
				this.tsdsModel = res.jobDetails;
				this.isPsds = true;
			}
			this.onClickNotification(ev);
		});
	    
	    this.isNew = true;
	    console.log("edit btn" , this.isNew)
  }

}