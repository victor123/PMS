import { Component , AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { AdminServices } from '../../../services/admin.service';

@Component({
  selector: 'constraint-view',
  templateUrl: './constraints.component.html',
  providers: [AdminServices],
  styleUrls: []
})
export class ConstraintComponent {
  title = 'constraint';
  public checked:boolean = true;
  public isView: boolean;
  public popupHead: string;
    public popupCont: string;
    public opened: boolean;
  constructor(private service: AdminServices, private ref:ChangeDetectorRef, private dialogService: DialogService){}

  public hardData:any = [];
  public softData:any = [];
  ngOnInit(){
    this.loadData();
  }
  public loadData (){
    let value = 'PSDS'
    this.service.getHardSoftConstraints(value)
      .subscribe((res) => {
       console.log("LoadData", res)
        let hardConstraint = res.hardConstraints;
        let softConstraint = res.softConstraints;
        this.hardData = this.costraintStringToBool(hardConstraint);
        this.softData = this.costraintStringToBool(softConstraint);
      });
  }
  public costraintStringToBool(value: any) {
    let boolData = [];
    boolData = JSON.parse(JSON.stringify(value));
    boolData.forEach((val, key) => {
      if (val.engineValidation == 'Y') {
          val.engineValidation = true;
      } else if (val.engineValidation == 'N'){
          val.engineValidation = false;
      }
      if (val.systemValidation == 'Y') {
          val.systemValidation = true;
      } else if (val.systemValidation == 'N'){
          val.systemValidation = false;
      }
    });
    return boolData;
  }
  

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  onChangeCheck(ev:any, val:any){
    // let coverData = this.costraintBoolToString(val)
    this.service.putHardSoftConstraints(val)
    .subscribe((res) => {
      if (res.status == 'S') {
         // console.log(res.status);
           this.popupHead = 'Success';
           this.popupCont = res.data[0].response;
           // this.showConfirmation();
           this.loadData();
        } else {
           this.popupHead = 'Failed';
           this.popupCont = res.data[0].response;
           this.showConfirmation();
        }
    });
  }
  onChangeChecks(ev:any, val:any){
    this.service.putHardSoftConstraints(val)
    .subscribe((res) => {
      if (res.status == 'S') {
         // console.log(res.status);
           this.popupHead = 'Success';
           this.popupCont = res.data[0].response;
           // this.showConfirmation();
           this.loadData();
        } else {
           this.popupHead = 'Failed';
           this.popupCont = res.data[0].response;
           this.showConfirmation();
        }
    });
  }
  public showConfirmation() {
      const dialog: DialogRef = this.dialogService.open({
          title: this.popupHead,
          content: this.popupCont,
          actions: [
              { text: "Close", primary: true }
          ],
          width: 450,
          height: 200,
          minWidth: 250
      });
    }
}