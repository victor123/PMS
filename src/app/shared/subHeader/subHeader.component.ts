import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PilotDemandDataService } from '../../services/pilotdemadchart.service';
import { JobDemandModel , TsdsModel} from '../modals/form.model';
/**
* This class represents the toolbar component.
*/
@Component({
	selector: 'app-subheader',
	templateUrl: './subHeader.component.html',
	styleUrls: [],
	providers: [PilotDemandDataService],
})
export class SubHeaderComponent implements OnInit {

	public modalRef: BsModalRef;
	public editDataItem: JobDemandModel;
	public tsdsModel: TsdsModel;
	public isNew: boolean;
	public isPsds: boolean;
	constructor(private modalService: BsModalService, private service: PilotDemandDataService ){}
	public ngOnInit() {
		this.loadData();
	}
	openModal(template: TemplateRef<any>) {
    	this.modalRef = this.modalService.show(template);
    	// this.loadData();
  	}
  	datas: any;
  	count: any;
  	notfication: any;
  	public loadData(){
		this.service.sysNotification().subscribe((res) => {
			this.datas = res.notifications;
			this.count = res.totalCount;
			this.notfication = res.notifications;
			console.log(res);
		})
	}
	onClickNotification(m: any){
		console.log('select user::', m);
		this.service.sysNotificationAlert(m).subscribe((res) => {
			this.datas = res.notifications;
			this.count = res.totalCount;
			console.log(res);
			if (res.success === 'Record Updated Successfully') {
				this.loadData();
			}
		})
	}
	onclick(val: any){
		this.datas = [];
		if (val === 'all') {
			this.datas = this.notfication; 
		} else {
			this.notfication.map((data, index) => {
				console.log(val);
				if (val === data.moduleCode) {
					this.datas.push(data);
				}
			})
		}
	}
	public cancelHandler(env: any) {
		console.log('cancel', this.editDataItem);
	    this.editDataItem = undefined;
	    this.isNew=false;
	    this.isPsds=false;
	    
	}
	public editHandler(ev: any) {
		console.log(ev);
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
				this.tsdsModel = res.jobDetails;
				this.isPsds = true;
			}
			this.onClickNotification(ev);
			
		});
  }
}