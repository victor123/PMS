import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';
import { PanelBarExpandMode } from '@progress/kendo-angular-layout';



@Component({
	selector: 'admin-layout',
	templateUrl: './admin.component.html',
	styleUrls: []
})
export class AdminNavComponent {
	viewMode="PSDS";
	public expandMode: number = PanelBarExpandMode.Multiple;
    public kendoPanelBarExpandMode: any = PanelBarExpandMode;
   

    public onChange(event: any): void {
        this.expandMode = parseInt(event.target.value);
    }

   


	public ngAfterContentInit(){
		
	}
}