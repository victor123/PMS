export class JobDemandModel {
	public orderNo: any;
	public jobType: any;
	public priorityCode: any;
	public effectiveCST: any;
	public plannedStartTime: any;
	public plannedEndTime: any;
	public locationToCode: any;
	public locationFromCode: any;
	public customerName: any;
	public agentContactDetails: any;
	public customerAgentName: any;
	public status: any;
	public pilotLicense: any;
	public deployedTime: any;
	public arrivedTime: any;
	public onboardTime: any;
	public startTime: any;
	public endTime: any;
	public remarksText:any;
	public vesselId: any;
	public vesselName: any;
	public vesselTypeCode: any;
	public grossTonnage: any;
	public draft: any;
	public height: any;
	public pilotCode: any;
	public srt: any;
	public cst: any;
	public mmsi: any;
	public contDetail: any;
}
export class TsdsModel {
	public orderNumber: any;
	public jobType: any;
	public priorityCode: any;
	public tugRequirement: any;
	public tugOrderSRT: any;
	public locationFrom: any;
	public locationTo: any;
	public pickupPoint: any;
	public letGoPoint: any;
	public confirmationIndicator: any;
	public containerJobIndicator: any;
	public tugOrderRemarks: any;
	public pilotOrderRemarks: any;
	public vesselId: any;
	public callSign: any;
	public vesselName: any;
	public vesselType: any;
	public grossTonnage: any;
	public vesselHeight: any;
	public vesselDraft: any;
	public assignedTugNumber: any;
	public tugName: any;
	public jobDuration: any;
	public status: any;
	public deployedTime: any;
	public ontheMoveTime: any;
	public arriveTime: any;
	public startTime: any;
	public endTime: any;
	public effectiveSRT: any;
	public specialJobIndicator: any;
	public company: any;
	public specialTextField: any;
	public pilotCode: any;
	public pilotJobCST: any;
	public pilotOnboardLocation: any;
	public jobStatus: any;
	public loa: any;
	public tonrindicator: any;
}
export class JobDemandFilterModel {
	public type: any;
	public name: any;
	public fromDate: any;
	public toDate: any;
}
export class ServiceLevelFilterModel {
	public type: any;
	public name: any;
	public fromDate: any;
	public toDate: any;
	public startTime: any;
	public endTime: any;
}
export class TugDetailsFilterModel {
	public type: any;
	public name: any;
	public fromDate: any;
	public toDate: any;
}
export class PilotGroupingModel {
    public colourCode: any;
    public colourName : any;
    public defaultBaseCode : any;
    public deploymentCode: any;
    public pilotGroupName : any;
    public pilotShiftType : any;
    public userId : any;
    public check: boolean;
}
export class Product {
    public ProductID: number;
    public ProductName = '';
    public Discontinued = false;
    public UnitsInStock: number;
    public UnitPrice = 0;
    public code: any;
    public description: any;
}
export class PilotDelayCodeModel{
	public delayCode: any;
	public description: any;
	public mappedStatus: any;
}
export class ServiceLevelConfigModel {
	public priorityId: any;
	public categoryName: any;
	public priorityCode: any;
	public vesselTypeCode: any;
	public vesselGrtLbQuantity: any;
	public vesselGrtUbQuantity: any;
	public vesselLoaLbQuantity: any;
	public vesselLoaUbQuantity: any;
	public vesselDraftLbQuantity: any;
	public vesselDraftUbQuantity: any;
	public locationFromGroupCode: any;
	public locationToGroupCode: any;
	public mosJobTypeCode: any;
	public sourcePartyCode: any;
	public userId: any;
}

export class ManagePreDefine{
	public configId: any;
	public moduleCode: any;
	public prefix:any;
	public details:any;
	public constraints:any;
	public userId:any;
	
}

export class PilotAutoUpdateModel{
    public deploymentCode: any;
    public pilotGroupName : any;
    public defaultBaseCode : any;
    public pilotShiftType: any;
	public orignalStatusCode : any;
	public threshold : any;
    public operator : any;
    public updatedStatusCode : any;
    public userId : any;
    public check: boolean;
}

export class PilotSectorConfig {
	public pilotSector: any;
	public pilotDescription : any;
	public latitudeFrom : any;
	public latitudeTo: any;
	public longitudeFrom : any;
	public longitudeTo : any;
	public locationTo: any;

}