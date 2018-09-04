import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
	selector: 'estimatedendtime-layout',
	templateUrl: './estimatedendtime.component.html',
	styleUrls: []
})
export class EstimatedEndTimeConfig {
	public defaultCheckValue: Date =  new Date(0,30,0);
	endtime: Date;
	defaultCheck: boolean;
	public value: Date =  new Date(0,0,0);

	constructor( public intl: IntlService ){}
	public ngAfterContentInit(){
		
	}
	savetime(event: any, val: any){
		let covert = this.formatTime(val);
		console.log('val', covert);
	}
	onChange(value: any){
		let covert = this.formatTime(value);
		console.log('value', covert);
	}
	defaultCheckchange(evn: any){
		let defaults = this.formatTime(this.defaultCheckValue);
		let currenttime = this.formatTime(this.value);
		if (evn.target.value) {
			// currenttime = defaults;
			console.log(currenttime, defaults);
			this.value = new Date(defaults);
		}
	}
	resettime(){
		
	}
	public formatTime(value ? : Date): string {
    	return value ? `${this.intl.formatDate(value, 'HH:mm:ss')}` : '';
    }
	public formatValue(value ? : Date): string {
	    return value ? `${this.intl.formatDate(value, 'dd-MM-yyyy')}` : '';
	}
}