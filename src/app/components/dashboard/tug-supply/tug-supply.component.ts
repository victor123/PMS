import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { PilotDemandDataService } from '../../../services/pilotdemadchart.service'
import { TugSupplyFilterModel } from '../pilot-effective/form.model';
// import * as moment from 'moment';
@Component({
	selector: 'tug-supply',
	templateUrl: './tug-supply.component.html',
	styleUrls: [],
	providers: [PilotDemandDataService]
})
export class TugSupplyComponent {
	private tugFilterModel: TugSupplyFilterModel;
	public filterForm: FormGroup;
	public today = new Date();
	public date:any;
	public time:any;
	public min: Date;
	public max: Date;
	public jdate = new Date();
	public steps: any = { hour: 1, minute: 5};
	public jtime: any;
	 // public defaultItem: { text: string, value: any } = { text: "8", value: 8 };
  	public listItems: Array<{ text: string, value: any }> = [
        { text: "9", value: 9 },
        { text: "12", value: 12 },
        { text: "15", value: 15 },
        { text: "18", value: 18 },
        { text: "21", value: 21 },
        { text: "24", value: 24 },
    ];
	constructor(private service: PilotDemandDataService, public fb: FormBuilder, private intl: IntlService) {
		this.filterForm = fb.group({
	      'date': ['', Validators.compose([Validators.required])],
	      'hours': ['9', Validators.compose([Validators.required])],
	      'time': ['', Validators.compose([Validators.required])]
	    })
    	this.tugFilterModel = new TugSupplyFilterModel();
	}
	public series: any[] = [
		{
			"name": "Demand",
			"data": []
		},
		{
			"name": "Tug",
			"data": []
		}
	];
	public axisData: any[] = [];
	public dates: any[];
	public hours = 9 ;
	show:boolean;
	ngOnInit() {
		this.min = new Date();
		this.jdate = new Date();
		this.jtime =this.get5minsTime();
		this.formatTime(this.jtime);
		let time = this.formatTime(this.jtime);
		console.log(this.jtime);
		let data1=[];
		let data2=[];
		let dates = this.formatValue(this.jdate);9
		this.service.tugchartData(dates, time, this.hours)
			.subscribe((res) => {
				console.log(res)
				this.series = res;
				Object.keys(res[0].data).forEach(key=> {
					data1.push(res[0].data[key])
					data2.push(res[1].data[key])
					let val = key.split(" ");
					this.axisData.push(val[1])
					
				});
				this.series[0].data=data1;
				this.series[0].name="Demand";
				this.series[1].name="Tug";
				this.series[1].data=data2;
				console.log(this.series, this.axisData);

			})
	}
	public get5minsTime() {
		var tim= new Date()
		var val=(tim.getMinutes()+5-tim.getMinutes()%5)
		if(val>=60)
		{
			val=0;
		}
		return new Date(tim.getMonth() + 1 + "/" + tim.getUTCDate() + "/" + tim.getFullYear() + " "+tim.getHours()+":"+ val);
	}
	private formatTime(value ? : Date): string {
    	return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  	}
  	private formatValue(value ? : Date): string {
    	return value ? `${this.intl.formatDate(value, 'dd-MM-yyyy')}` : '';
  	}
  	public submitFilter (values: any) {
		this.axisData=[];
		let val
		let data1=[];
		let data2=[];
		console.log(this.jtime)
		let time = this.formatTime(values.time);
		let dates = this.formatValue(values.date);
		console.log('values', values, time , dates)
		this.service.tugchartData(dates, time , values.hours)
			.subscribe((res) => {
				console.log(res)
				this.series = res;
				Object.keys(res[0].data).forEach(key => {
					data1.push(res[0].data[key])
					data2.push(res[1].data[key])
					let val = key.split(" ");
					this.axisData.push(val[1])
				});
				this.series[0].data = data1
				this.series[1].data = data2
				this.series[0].name="Demand"
				this.series[1].name="Tug"
				this.show=true
				console.log(this.series, this.axisData);
			})
	}
	public onReset(){
		this.jtime =this.get5minsTime();
		this.filterForm.reset({
			'date': new Date(),
	      	'hours': '9',
	      	'time': this.jtime
		});
		this.axisData=[];
		let val
		let data1=[];
		let data2=[];
		console.log(this.jtime)
		let time = this.formatTime(this.filterForm.value.time);
		let dates = this.formatValue(this.filterForm.value.date);
		console.log('values', this.filterForm.value, time , dates)
		this.service.tugchartData(dates, time , this.filterForm.value.hours)
			.subscribe((res) => {
				console.log(res)
				this.series = res;
				Object.keys(res[0].data).forEach(key => {
					data1.push(res[0].data[key])
					data2.push(res[1].data[key])
					let val = key.split(" ");
					this.axisData.push(val[1])
				});
				this.series[0].data = data1
				this.series[1].data = data2
				this.series[0].name="Pilot"
				this.series[1].name="Demand"
				this.show=true
				console.log(this.series, this.axisData);
			})
		this.show=false;
	}
}