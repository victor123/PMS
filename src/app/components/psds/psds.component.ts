
import { Component, AfterViewInit, ViewChild, OnInit, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { PsdsService } from '../../services/psds.service';
import { CommonService } from '../../services/common.service';
import { IntlService } from '@progress/kendo-angular-intl';
import { Validators, FormGroup, FormControl } from '@angular/forms';
declare var kendo: any;
let jobs: any = [], that: any;
let i: any, j: any, scheduler: any, pilotsda: any[] = [];
let dataS = [];
@Component({
  selector: 'app-psds',
  templateUrl: './psds.component.html',
  styleUrls: ['./psds.component.css'],
  providers: [PsdsService, CommonService]
})
export class PsdsComponent implements OnInit, AfterViewInit {
  @ViewChild('scheduler') scheduler: ElementRef;
  @ViewChild('contextMenu') contextMenu: ElementRef;
  @ViewChild("contextpilot") contextpilot: ElementRef;
  @ViewChild('grid') grid: ElementRef;
  @ViewChild('events') events: ElementRef;
  @ViewChild('pilots') pilot: ElementRef;
  edit: boolean;
  reopen: any;
  redetials: any;
  deopen: any;
  dedetials: any;
  JobDemandModel: any[] = [];
  isNew: boolean = false;
  steps: any = { hour: 1, minute: 5 };
  Editspecial: any = 0;
  fprompt:any;
  contextmenustyle: any;
  pilots: any[];
  pilotdetails: any[]
  pilotsdata: any[];
  currentIndex: any;
  basedetails: any;
  reasonCodes: any;
  contextstyle: any;
  index: any;
  datas: any[] = [];
  operationalReadinessIndicator: boolean;
  Unplanned: boolean = false;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  ujopen = false
  show = false;
  enableind = false;
  ujdetials: any;
  pilotdet: any;
  hours: any = 8;
  mins: any = 4
  searchText: any;
  pilotsda: any;
  startDate: any;
  endDate: any;
  rclick: any = 0;
  pasthour: any = "06:00";
  pasthours: boolean = true;
  errorid: string;
  errormessage: any;
  onprompt = false;
  status: any;
  EMessage: any;
  time: any;
  wholedata: any[];
  cvopen:boolean=false;
  cvdetials:any[];
  Pilotgroup:any;
  dropdownlist:any[];
  plannedval:any[];
  sectors:any[];
  selectedsector:string="";
  jobcolor:any;
  constructor(public services: PsdsService, public cdRef: ChangeDetectorRef, public CommonService: CommonService, public intl: IntlService) { }
  //activates the menu with the coordinates
  licenseSortby(val, type) {
    this.pilotsda = this.CommonService.sortby(this.pilotsdata, val, type);
  }
  removecontextClick() {
    if (this.rclick === 1) {
      this.contextmenustyle = { 'transform': 'translateY(0px)', 'transition': 'all 200ms ease-out' }
      setTimeout(() => {
        this.show = true;
        this.contextmenustyle = { 'transition': 'all 200ms ease-out', 'transform': 'translateY(-163px)' }
      }, 100)
      setTimeout(() => {
        this.show = true;
        this.contextstyle = { 'left.px': this.contextmenuX, 'top.px': this.contextmenuY, 'overflow': 'hidden' }
      }, 200)
      this.rclick = 0
    }
  }
  public cancelHandler() {
    this.JobDemandModel = undefined;
    this.isNew = false;
  }
  onrightClick(event, val) {
    this.rclick = 1
    event.stopPropagation();
    if (val.enginePlanIndicator == "Y") this.enableind = false
    else this.enableind = true;
    this.edit = false;
    this.show = false;
    this.pilotdet = val
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextstyle = { 'left.px': this.contextmenuX, 'top.px': this.contextmenuY + document.documentElement.scrollTop, 'overflow': 'hidden', 'display': 'none' }
    this.contextmenustyle = { 'transform': 'translateY(0px)', 'transition': 'all 200ms ease-out' }
    setTimeout(() => {
      this.show = true;
      this.contextmenustyle = { 'transition': 'all 200ms ease-out', 'transform': 'translateY(-163px)' }
    }, 100)
    setTimeout(() => {
      this.show = true;
      this.contextstyle = { 'left.px': this.contextmenuX, 'top.px': this.contextmenuY + document.documentElement.scrollTop, 'overflow': 'hidden' }
    }, 200)
    setTimeout(() => {
      this.show = true;
      this.contextstyle = { 'left.px': this.contextmenuX, 'top.px': this.contextmenuY + document.documentElement.scrollTop, 'overflow': 'hidden' }
      this.contextmenustyle = { 'transition': 'all 200ms ease-out', 'transform': 'translateY(0px)' }
    }, 300)
  }
  //disables the menu
  disableContextMenu() {
    this.contextmenu = false;
  }
  serachpilot(val) {
    this.pilotsda = this.CommonService.search(this.pilotsdata, val.target.value)
    this.refresh();

  }
  changehours(val) {
    this.hours = val;
    this.changedate();
    this.refresh();
  }
  changemins(val) {
    this.mins = val;
    this.refresh();
  }

  multiFilter(array, filters) {
    let data=[]
    // filters all elements passing the criteria
    console.log(array)
    array.forEach(item => {
      // dynamically validate all filter criteria
      console.log(item)
      filters.forEach(key => 
        {
           if(key.staffRecordId===item.staffRecordId)
            {
               data.push(item)
               return;
             }
        });

    });
    return data;
  }
  changesector(val)
  {
    this.services.sectorplannedJobs(val).subscribe((res)=>{
      if(res.length>0)
      {
        this.pilotsda=JSON.parse(JSON.stringify(this.pilotsdata))
        this.pilotsda = this.multiFilter(this.pilotsda,res );
        this.refresh()
        console.log(this.pilotsda)
      }
      // else
      // {
      //   this.onprompt=true;
      //   this.status="F";
      //   this.errormessage={}

      // }

      // var result = this.pilotsda.items.filter((e) => res.includes(e.staffRecordId));
    })
    console.log(val)
  }
  ngOnInit() {
    let k=0;
    this.changedate();
    this.services.pilotGroupingDetails().subscribe(val=>{
      this.Pilotgroup=val;
    })
    this.services.pilotJobColourConfig().subscribe(val=>{
      this.jobcolor=val;
    })
    this.services.getpilotSectorDetails().subscribe(val=>{
      this.sectors=val
    })
    this.services.getunplannedjobs().subscribe((res) => {
      res.map((val, index) => {
        var rp = this.services.daysBetween(val.srt, val.cst);
        if (30 <= rp && rp <= 180) {
          res[index].rp = ">>"
        }
        else if (rp > 180) {
          res[index].rp = ">>>"
        }
        else if (30 > rp) {
          res[index].rp = ""
        }
      })
      dataS = res
      this.datas = dataS;
    })

    this.services.reasonCodes().subscribe((data) => {
      this.reasonCodes = data
    })
    this.contextstyle = { 'left.px': this.contextmenuX, 'top.px': this.contextmenuY, 'overflow': 'hidden' }
  }
  ngAfterViewInit() {
    var pilots=[]
    this.services.getPilots().subscribe((res) => {
      this.pilotsdata = res
      res.map((data, index) => {
        pilots.push(data.pilotName)
        this.pilotsdata[index]['text'] = data.pilotName
        this.pilotsdata[index]['value'] = data.staffRecordId
      })
      this.pilotsda = JSON.parse(JSON.stringify(this.pilotsdata))
      this.pilots = pilots
      this.createShedular(this);
    })
  }
  refresh() {
    kendo.jQuery(this.scheduler.nativeElement).html("")
    this.createShedular(this);
  }
  removelist() {
    this.currentIndex = '';
  }
  removeshow() {
    this.show = false;
  }
  disablehours() {
    if (this.pasthour == "00:00") {
      this.pasthour = "06:00"
    }
    else
      this.pasthour = "00:00";
    this.changedate()
    kendo.jQuery(this.scheduler.nativeElement).html("")
    this.createShedular(this)
  }
  changedate() {
    var d = new Date(); // for now
    var timediff = this.parseTime(d.getHours() + ":" + d.getMinutes()) - this.parseTime(this.pasthour);
    var realmin = timediff % 60
    var hours = Math.floor(timediff / 60)
    if (hours < 0) {
      hours = 24 - hours
    }
    var ds = d.getHours()
    var j = d.getHours() + parseInt(this.hours)
    console.log(j)
    if (j > 24) {
      j = j - 24
      var k = new Date()
      var cal = k.setDate(k.getDate() + 1)
      this.endDate = new Date(d.getMonth() + 1 + "/" + k.getDate() + "/" + d.getFullYear() + " " + j + ":00")
    } else {
      this.endDate = new Date(d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear() + " " + j + ":00")
    }
    this.startDate = new Date(d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear() + " " + hours + ":00")
    this.startDate = new Date("02-22-2018 00:00");
    this.endDate = new Date("02-22-2018 23:00");
  }
  parseTime(s) {
    var c = s.split(':');
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }
  createShedular(that) {
    scheduler = kendo.jQuery(this.scheduler.nativeElement).kendoScheduler({
      footer: false,
      header: false,
      date: this.startDate,
      startTime: this.startDate,
      endTime: this.endDate,
      currentTimeMarker: {
        updateInterval: 60000,
      },
      dateHeaderTemplate: kendo.template("<div class='hide'>#=kendo.toString(date, 'D')# - #=kendo.toString(kendo.date.nextDay(date), 'D')#</div>"),
      eventHeight: 40,
      majorTick: 360,
      views: [{
        type: "timeline",
        selected: true,
        majorTick: 60,
        columnWidth: 50,
        minorTickCount: that.mins,
        majorTimeHeaderTemplate: kendo.template("<div class='datehead'>#=kendo.toString(date, 'HH:mm')#</div><div class='dateslot'># for (var i = 0; i < " + that.mins + "; i++){# #if(i==0){# <li class='date" + that.mins + "'>00</li> #}else{# <li class='date" + that.mins + "'>#= (i)*(60/" + that.mins + ") #</li> #}# #} #</div>"),
      }, "month", "year"],
      messages: {
        editor: {
          description: "Notes"
        }
      },
      dataBound: function (e) {
        createDropArea(this);
        BlockOffTime(this);
      },
      eventTemplate: '<div class="hyde">  <div class=""> #if(status){# <div class="availablejobs"> <div class="top"> #: rp # #: locationFromCode # #: minPilotLicenceCode # #: vesselName # #: locationToCode # </div> <div class="bottom" style="background-color:rgb(#= colourCode #)"> #: jobsat #</div> </div> #} else {# <div class="unavailablejobs disable" > <div class="top disable"> #: rp # #: locationFromCode # #: minPilotLicenceCode # #: vesselName # #: locationToCode # </div> <div class="bottom disable" > UNAVAILABLE</div>  </div>#}#   </div></div>',
      selectable: true,
      dataBinding: scheduler_dataBinding,
      save: scheduler_save,
      remove: scheduler_remove,
      edit: scheduler_edit,
      add: scheduler_add,
      cancel: scheduler_cancel,
      moveStart: scheduler_moveStart,
      move: scheduler_move,
      moveEnd: scheduler_moveEnd,
      resizeStart: scheduler_resizeStart,
      resize: scheduler_resize,
      resizeEnd: scheduler_resizeEnd,
      navigate: scheduler_navigate,
      change: scheduler_change,
      editable: {
        create: false,
        update: false,
        template: kendo.jQuery("#events").html(),
      },
      dataSource: {
        batch: true,
        transport: {
          read: function (options) {
            var data = [];
            that.services.plannedJobs().subscribe((res) => {
              res.map((val, index) => {
                var rp = that.services.daysBetween(val.srt, val.cst);
                if (30 <= rp && rp <= 180) {
                  res[index].rp = ">>"
                }
                else if (rp > 180) {
                  res[index].rp = ">>>"
                }
                else if (30 > rp) {
                  res[index].rp = ""
                }
                res[index]['planStartDate'] = kendo.timezone.apply(new Date(val.planStartDate), -330);
                res[index]['planEndDate'] = kendo.timezone.apply(new Date(val.planEndDate), -330);
                res[index].vesselName = res[index].vesselName
                res[index].status = true;
                res[index].jobsat=plannedstatus(res[index].jobStatus)
                data.push(res[index])
              })
              that.services.getunavailbleslots(that.startDate, that.endDate).subscribe((res) => {
                res.map((val, index) => {
                  res[index]['planStartDate'] = kendo.timezone.apply(new Date(val.startDate), -330);
                  res[index]['planEndDate'] = kendo.timezone.apply(new Date(val.endDate), -330);
                  res[index].rp = "";
                  res[index].locationFromCode = "";
                  res[index].minPilotLicenceCode = "";
                  res[index].vesselName = "";
                  res[index].locationToCode = "";
                  res[index].status = false;
                  data.push(res[index])
                })
                that.wholedata = data;
                options.success(data)
              })
            })
          },
          update: function (options) {
            if (options.data.models[0].status) {
              let data = {
                "jobId": options.data.models[0].jobId,
                "minPilotLicenceCode": options.data.models[0].minPilotLicenceCode,
                "staffRecordId": options.data.models[0].staffRecordId,
                "planStartDate": new Date(options.data.models[0].planStartDate),
                "availId": 12,
                "planEndDate": new Date(options.data.models[0].planEndDate)
              }
              that.services.createjobs(data).subscribe(
                (res) => {

                  that.errorhandling(res)
                  if (res.status == "F") {

                    options.error([]);
                  }
                  else {
                    options.success([]);
                  }
                })
            }
            else {
              var data = { "unAvailId": options.data.models[0].unAvailId, "availId": options.data.models[0].availId, "staffRecordId": options.data.models[0].staffRecordId, "reasonCode": options.data.models[0].reasonCode, "remarksText": options.data.models[0].remarksText, "startDate": options.data.models[0].planStartDate, "endDate": options.data.models[0].planEndDate, "baseCode": options.data.models[0].baseCode, "userId": "sdasf" }
              that.services.updateunavilslots(data).subscribe((res) => {
                options.success([]);
              })
            }

          },
          create: function (options) {
            options.success([]);
          },
          destroy: function (options) {
            options.success([]);
          },
          parameterMap: function (options, operation) {
            if (operation !== "read" && options.models) {
              return { models: kendo.stringify(options.models) };
            }
          }
        },
        change(data) {

        },
        error(xhr, error) {
          console.debug(xhr);
          console.debug(error);
        },

        schema: {
          model: {
            id: "jobId",
            fields: {

              jobId: { from: "jobId" },
              id: { from: "id" },
              title: { defaultValue: "No Title" },
              planStartDate: { from: "planStartDate" },
              planEndDate: { from: "planEndDate" },
              start: { type: "date", from: "planStartDate" },
              end: { type: "date", from: "planEndDate" },
              minPilotLicenceCode: { from: "minPilotLicenceCode" },
              staffRecordId: { from: "staffRecordId", type: "number" }
            }
          }
        }
      },
      group: {
        resources: ["staffRecordId"],
        orientation: "vertical"
      },
      resources: [{
        field: "staffRecordId",
        name: "staffRecordId",
        dataSource: this.pilotsda,
        title: "staffRecordId"
      }]
    }).data("kendoScheduler");
    function scheduler_change(e)
    {
        that.dropdownlist={  'display': 'block', 'z-index': 11111,'margin-top.px': 34 }
        
    }

    function plannedstatus(val)
    {
      let text;
      switch (val) {
        case "1":
            text = "UNPLANNED";
            break;
        case "2":
            text = "PLANNED";
            break;
        case "3":
            text = "FIXED";
            break;
        case "4":
            text = "DEPLOYED";
            break;
        case "5":
            text = "ARRIVED";
            break;
        case "6":
            text = "ONBOARD";
            break;
        case "7":
            text = "STARTED";
            break;
        case "8":
            text = "COMPLETED";
            break;
        case "9":
            text = "PONR";
            break;
      }
      return text
    }
    function changetime(time) {
      console.log(time)
      return time;
    }

    function scheduler_dataBinding(e) {
      // e.preventDefault();
      console.log("dataBinding", e);
    }

    function scheduler_dataBound(e) {
      console.log("dataBound", e);
    }

    function scheduler_save(e) {
      console.log("save", e);
    }

    function scheduler_remove(e) {
      e.preventDefault();
      console.log("remove", e);
    }

    function scheduler_cancel(e) {
      console.log("cancel", e);
    }

    function scheduler_edit(e) {
      console.log("edit", e);
    }

    function scheduler_add(e) {
      console.log("add");
    }

    function scheduler_moveStart(e) {
      if (!e.event.status)
        e.preventDefault();
    }

    function scheduler_move(e) {
      // if (roomIsOccupied(e.start, e.end, e.event, e.resources) || attendeeIsOccupied(e.start, e.end, e.event, e.resources)) {
      //           this.wrapper.find(".k-event-drag-hint").addClass("invalid-slot");
      //  }
    }

    function scheduler_moveEnd(e) {
      console.log(e)
      let target = kendo.jQuery(e.target);
      console.log(scheduler.occurrenceByUid(target.data("uid")))
      // if (!checkAvailability(e.start, e.end, e.event, e.resources)) {

      //   e.preventDefault();
      // }
    }

    function scheduler_resizeStart(e) {

      console.log("resizeStart");
    }
    
    function scheduler_resize(e) {

      console.log(e)
      // if (roomIsOccupied(e.start, e.end, e.event, e.resources) || attendeeIsOccupied(e.start, e.end, e.event, e.resources)) {
      //       this.wrapper.find(".k-marquee-color").addClass("invalid-slot");
      //       e.preventDefault();
      //  }
    }

    function scheduler_resizeEnd(e) {

      // console.log(e)
      // if (!checkAvailability(e.start, e.end, e.events,'')) {
      //       e.preventDefault();
      //  }
    }

    function scheduler_navigate(e) {
      // console.log(e)
      // console.log(kendo.format("navigate:: action:{0}; view:{1}; date:{2:d};", e.action, e.view, e.date));
    }

    function BlockOffTime(scheduler) {
      kendo.jQuery(".k-scheduler-table td").each(function (i, item) {
        var slot = scheduler.slotByElement(item);
        if (!isBusinessHour(slot)) {
          kendo.jQuery(item).addClass("restrict");
        }
        else
          kendo.jQuery(item).removeClass("restrict")
      });
    }
    function isBusinessHour(slot) {


      var businessDay = that.pilotsda[slot.groupIndex];

      var slotStart = parseFloat(slot.startDate.getHours() + "." + slot.startDate.getMinutes());
      var slotEnd = parseFloat(slot.endDate.getHours() + "." + slot.endDate.getMinutes());
      var start = parseFloat(new Date(businessDay.shiftStartDate).getHours() + "." + slot.startDate.getMinutes());
      var end = parseFloat(new Date(businessDay.shiftEndDate).getHours() + "." + slot.endDate.getMinutes());

      if (slotStart >= start && slotEnd <= end && slotEnd != 0) {
        //console.log(slot.startDate,new Date(businessDay.shiftStartDate),new Date(businessDay.shiftEndDate),slot.endDate)
        return true;
      } else {
        return false;
      }
    }

    kendo.jQuery(this.scheduler.nativeElement).on("dblclick", '.unavailablejobs ', function (e) {
      //console.log(e)
      let scheduler = kendo.jQuery(that.scheduler.nativeElement).getKendoScheduler();
      let element = kendo.jQuery(e.target).is(".k-event") ? kendo.jQuery(e.target) : kendo.jQuery(e.target).closest(".k-event");
      let event = scheduler.occurrenceByUid(kendo.jQuery(element).data("uid"));
      that.ujopen = true

      that.ujdetials = event
      that.edit = true;
      that.cdRef.detectChanges();
      //console.log(event)
    })
    kendo.jQuery("body").on("click", '.availablejobs ', function (e) {
      e.stopPropagation()
      let element = kendo.jQuery(e.target).is(".k-event") ? kendo.jQuery(e.target) : kendo.jQuery(e.target).closest(".k-event");
      let offset=kendo.jQuery(this).offset()
      let data=scheduler.occurrenceByUid(kendo.jQuery(element).data("uid"));
      that.plannedval = data;
      that.dropdownlist = { 'left.px': offset.left, 'top.px': offset.top, 'z-index': 11111,'margin-top.px': 40 }
      //console.log(data,offset)
      // let selectedRows = kendo.jQuery(this);
      // let dataItem = grid.dataItem(kendo.jQuery(this));
      // that.JobDemandModel = dataItem;
      // that.isNew = true;
      that.cdRef.detectChanges(); 
    });
    kendo.jQuery("body").on("click", 'body ', function (e) {
      e.stopPropagation()
      let element = kendo.jQuery(e.target).is(".k-event") ? kendo.jQuery(e.target) : kendo.jQuery(e.target).closest(".k-event");
      let offset=kendo.jQuery(this).offset()
      let data=scheduler.occurrenceByUid(kendo.jQuery(element).data("uid"));
      that.plannedval = data;
      that.dropdownlist = { 'left.px': offset.left, 'top.px': offset.top, 'z-index': 11111,'margin-top.px': 40,display:'none' }
      //console.log(data,offset)
      // let selectedRows = kendo.jQuery(this);
      // let dataItem = grid.dataItem(kendo.jQuery(this));
      // that.JobDemandModel = dataItem;
      // that.isNew = true;
      that.cdRef.detectChanges(); 
    });
    kendo.jQuery(this.scheduler.nativeElement).on("dblclick", '.availablejobs', function (e) {
      let scheduler = kendo.jQuery(that.scheduler.nativeElement).getKendoScheduler();
      let element = kendo.jQuery(e.target).is(".k-event") ? kendo.jQuery(e.target) : kendo.jQuery(e.target).closest(".k-event");
      let event = scheduler.occurrenceByUid(kendo.jQuery(element).data("uid"));

      let data=that.services.getunvaild(event)
      that.JobDemandModel = data;
      console.log(that.JobDemandModel)
      that.isNew = true;
      that.cdRef.detectChanges();
    }); function onOpen(e) {
      // console.log(kendo.jQuery(e.item).children);
    }
    let text = "";
    function onClose(e) {
      console.log(text)
      var d = kendo.jQuery(e.item).parent().attr('class').split(' ')
      if (text !== "Declare PONR") {
        text="";
        //e.preventDefault()
      }
      //console.log(kendo.jQuery(e.item).children);
    }

    function onSelect(e) {
      //console.log(kendo.jQuery(e.item).children);
    }

    function onActivate(e) {
      //console.log(kendo.jQuery(e.item).children);
    }

    function onDeactivate(e) {
      // console.log(kendo.jQuery(e.item).children);
    }
    function contextlist(val, jobID, date) {
      var text = "";
      console.log(val)
      switch (val) {
        case "Create Relief": {
          that.reopen = true;
          break;
        }
        case "Fix Job": {
          let data = { "isFixRequired": true, "userId": "SYSTEM", "jobList": [jobID] }
          that.services.fixPlannedJobs(data).subscribe((res) => {
            that.errorhandling(res)
            if (res.status == "S")
              scheduler.dataSource.read();
          })
          break;
        }
        case 'Unfix Job':{
          let data = { "isFixRequired": false, "userId": "SYSTEM", "jobList": [jobID] }
          that.services.fixPlannedJobs(data).subscribe((res) => {
            that.errorhandling(res)
            if (res.status == "S")
              scheduler.dataSource.read();
          })
          break;
        }
        case 'Undo Deployed':{
           let data = { "isRevertRequired": true, "userId": "SYSTEM", "jobId": jobID, 'dateTime': new Date() }
          contextcall(data)
          break;
        }
        case 'Undo Arrive':{
           let data = { "isRevertRequired": true, "userId": "SYSTEM", "jobId": jobID, 'dateTime': new Date() }
          contextcall(data)
          break;
        }
        case 'Undo Onboard':{
           let data = { "isRevertRequired": true, "userId": "SYSTEM", "jobId": jobID, 'dateTime': new Date() }
          contextcall(data)
          break;
        }
        case 'Undo Start':{
           let data = { "isRevertRequired": true, "userId": "SYSTEM", "jobId": jobID, 'dateTime': new Date() }
          contextcall(data)
          break;
        }
        case 'Undo End':{
           let data = { "isRevertRequired": true, "userId": "SYSTEM", "jobId": jobID, 'dateTime': new Date() }
          contextcall(data)
          break;
        }
        case "Deploy Job": {
          let data = { "isRevertRequired": false, "userId": "SYSTEM", "jobId": jobID, 'dateTime': new Date(date) }
          contextcall(data)
          break;
        }
        case "Unassign Job":{
          let data = { "userId": "SYSTEM", "jobList": [jobID]  }
            that.services.unAssignJobs(data).subscribe((res) => {
              that.errorhandling(res)
              if (res.status == "S")
                scheduler.dataSource.read();
            })
          break;
        }
  
        case "Declare Arrived": {
          let data = { "isRevertRequired": false, "userId": "SYSTEM", "jobId": jobID, 'dateTime': date }
          contextcall(data)
          break;
        }
        case "Declare Onboard": {
          let data = { "isRevertRequired": false, "userId": "SYSTEM", "jobId": jobID, 'dateTime': date }
          contextcall(data)
          break;
        }
        case "Declare Started": {
          let data = { "isRevertRequired": false, "userId": "SYSTEM", "jobId": jobID, 'dateTime': date }
          contextcall(data)
          break;
        }
        case "Declare End": {
          let data = { "isRevertRequired": false, "userId": "SYSTEM", "jobId": jobID, 'dateTime': date }
          contextcall(data)
          break;
        }
        case "Declare PONR": {
          that.time = {time:date,val:false}
          that.deopen = true;
          break;
        }
        case 'Undo PONR':{
         that.time = {time:new Date(),val:true}
          that.deopen = true;
         break;
       }
        case "Create Pilot delay": {
          text = "started";
          break;
        }
        case "Resend Pilot Info": {
          text = "started";
          break;
        } case "Resend Job Info to Pilot": {
          that.cvopen=true;
          break;
        } case "Update Estimated End Time": {
          text = "started";
          break;
        }
        case "Approve Vessel Movement": {
          that.cvopen=true;
          break;
        } case "Clear Vessel Sailing Movement": {
          
          that.cvopen=true;
          break;
        }
        default:
          text = "";
      }
      return;
    }
    function contextcall(data) {
      that.services.plannedJobsStatus(data).subscribe((res) => {
        that.errorhandling(res)
        if (res.status == "S")
          scheduler.dataSource.read();
      })
    }
    kendo.jQuery(this.contextMenu.nativeElement).kendoContextMenu({
      filter: ".k-event, .k-scheduler-table td",
      target: this.scheduler.nativeElement,
      orientation: "vertical",
      close: onClose,
      activate: onActivate,
      deactivate: onDeactivate,

      //Optionally show the menu on left mouse click:
      //showOn: "click",
      select: function (e) {
        var val = kendo.jQuery(e.item).children(".k-link").text()
        var d = kendo.jQuery(e.item).parent().attr('class').split(' ')
        var target = kendo.jQuery(e.target);
        that.redetials = scheduler.occurrenceByUid(target.data("uid"))
        var index = scheduler.dataSource.data().map((val, index) => {
          if (val.jobId === that.redetials.jobId) {
            that.wholedata[index].jobStatus = "8"
          }
        })
        let d1=kendo.jQuery(e.item).children().siblings()
        console.log(d1)
        if (d[0] == "k-group") {
          let valdata = kendo.jQuery(e.item).parent().siblings().text()
          var time = val.split(" ")
          var data = time[2].split("/")
          let date = data[1] + "-" + data[0] + "-" + data[2] + " " + time[3]
          text=valdata

          contextlist(valdata, that.redetials.jobId, date)

          e.preventDefault()
        }
        else {
          if(d1[1]==undefined)
          contextlist(val, that.redetials.jobId, "")
        }
        // if (target.hasClass("k-event")) {
        //   var occurrenceByUid = scheduler.occurrenceByUid(target.data("uid"));
        //   scheduler.editEvent(occurrenceByUid);
        // } else {
        //   var slot = scheduler.slotByElement(target);
        //   scheduler.addEvent({
        //     start: slot.startDate,
        //     end: slot.endDate
        //   });
        // }
      },
      open: function (e) {
        var menu = e.sender;
        menu.remove(".myClass");
        var target = kendo.jQuery(e.target);
        let data = scheduler.occurrenceByUid(target.data("uid"))
        console.log(data)
        var ponr = "";
        var menudata = []
        if (data.jobStatus == 8)
          ponr = "Undo PONR"
        else
          ponr = "Declare PONR"

          console.log(data.jobStatus)
        if (target.hasClass("k-event"))
          console.log(data.jobStatus)
        if (data.jobStatus == "2") {
          menudata = [{ text: "Fix Job", cssClass: "myClass" }, { text: "Deploy Job", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Unassign Job", cssClass: "myClass" }, { text: "Create Relief", cssClass: "myClass" },
          { text: "Create Pilot delay", cssClass: "myClass" }, { text: "Resend Pilot Info", cssClass: "myClass" },
          { text: "Resend Job Info to Pilot", cssClass: "myClass" }, { text: "Update Estimated End Time", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Approve Vessel Movement", cssClass: "myClass" },
          { text: "Clear Vessel Sailing Movement", cssClass: "myClass" }]
        }
        else if (data.jobStatus == "3") {
          menudata = [{ text: "Deploy Job", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Unfix Job", cssClass: "myClass" }, { text: "Unassign Job", cssClass: "myClass" }, { text: "Create Relief", cssClass: "myClass" },
          { text: "Create Pilot delay", cssClass: "myClass" }, { text: "Resend Pilot Info", cssClass: "myClass" },
          { text: "Resend Job Info to Pilot", cssClass: "myClass" }, { text: "Update Estimated End Time", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Approve Vessel Movement", cssClass: "myClass" },
          { text: "Clear Vessel Sailing Movement", cssClass: "myClass" }]
        }
        else if (data.jobStatus == "4") {
          menudata = [{ text: "Declare Arrived", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Undo Deployed", cssClass: "myClass" }, { text: "Create Relief", cssClass: "myClass" },
          { text: "Create Pilot delay", cssClass: "myClass" }, { text: "Resend Pilot Info", cssClass: "myClass" },
          { text: "Resend Job Info to Pilot", cssClass: "myClass" }, { text: "Update Estimated End Time", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Approve Vessel Movement", cssClass: "myClass" },
          { text: "Clear Vessel Sailing Movement", cssClass: "myClass" }]
        }
        else if (data.jobStatus == "5") {
          menudata = [{ text: "Declare Onboard", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Undo Arrive", cssClass: "myClass" }, { text: "Declare PONR", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Create Relief", cssClass: "myClass" },
          { text: "Create Pilot delay", cssClass: "myClass" }, { text: "Resend Pilot Info", cssClass: "myClass" },
          { text: "Resend Job Info to Pilot", cssClass: "myClass" }, { text: "Update Estimated End Time", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Approve Vessel Movement", cssClass: "myClass" },
          { text: "Clear Vessel Sailing Movement", cssClass: "myClass" }]
        }
        else if (data.jobStatus == "6") {
          menudata = [{ text: "Declare Started", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Undo Onboard", cssClass: "myClass" }, { text: "Declare PONR", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Create Relief", cssClass: "myClass" },
          { text: "Create Pilot delay", cssClass: "myClass" }, { text: "Resend Pilot Info", cssClass: "myClass" },
          { text: "Resend Job Info to Pilot", cssClass: "myClass" }, { text: "Update Estimated End Time", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Approve Vessel Movement", cssClass: "myClass" },
          { text: "Clear Vessel Sailing Movement", cssClass: "myClass" }]
        }
        else if (data.jobStatus == "7") {
          menudata = [{ text: "Declare End", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Undo Start", cssClass: "myClass" }, { text: "Declare PONR", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Create Relief", cssClass: "myClass" },
          { text: "Create Pilot delay", cssClass: "myClass" }, { text: "Resend Pilot Info", cssClass: "myClass" },
          { text: "Resend Job Info to Pilot", cssClass: "myClass" }, { text: "Update Estimated End Time", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Approve Vessel Movement", cssClass: "myClass" },
          { text: "Clear Vessel Sailing Movement", cssClass: "myClass" }]
        }
        else if (data.jobStatus == "8") {
          menudata = [{ text: "Undo End", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Create Relief", cssClass: "myClass" },
          { text: "Create Pilot delay", cssClass: "myClass" }, { text: "Resend Pilot Info", cssClass: "myClass" },
          { text: "Resend Job Info to Pilot", cssClass: "myClass" }, { text: "Update Estimated End Time", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Approve Vessel Movement", cssClass: "myClass" },
          { text: "Clear Vessel Sailing Movement", cssClass: "myClass" }]
        }
        else if (data.jobStatus == "9") {
          menudata = [{ text: "Undo PONR", cssClass: "myClass" }, { text: "Create Relief", cssClass: "myClass" },
          { text: "Create Pilot delay", cssClass: "myClass" }, { text: "Resend Pilot Info", cssClass: "myClass" },
          { text: "Resend Job Info to Pilot", cssClass: "myClass" }, { text: "Update Estimated End Time", cssClass: "myClass", items: that.CommonService.get300dates() }, { text: "Approve Vessel Movement", cssClass: "myClass" },
          { text: "Clear Vessel Sailing Movement", cssClass: "myClass" }]
        }

        menu.append(menudata);
      }
    }
    );
    
    var grid = kendo.jQuery(this.grid.nativeElement).kendoGrid({
      groupable: true,
      sortable: true,
      pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5
      },
      columns: [{ title: " Re Program", field: "rp" }, { title: "PSAM Tug Indicator ", field: "tugQuantity" }, { title: "Location Form", field: "locationFromCode" }, { field: "cstDate", title: "CST", format: "{0:yyyy/MM/dd HH:mm}" },
      { title: "Vessel Arrival Confirmation", field: "vesselArrivalConfirmation" }, { title: "Vessel Name", field: "vesselName" }, { title: "Location To", field: "locationToCode" }],
      selectable: "single row",
      change: onChange,
      dataSource: {
        transport: {
          read: function (e) {
            e.success(dataS);
          }
        },
        pageSize: 10
      }
    }).data("kendoGrid");
    kendo.jQuery("#gridmenu").kendoContextMenu({
      target: "#grid",
      filter: "tr[role='row']",
      select: function(e) {
        //let grid = kendo.jQuery(that.scheduler.nativeElement).data("kendoGrid");
        var model = grid.dataItem(e.target);
        var val = kendo.jQuery(e.item).children(".k-link").text()
        
       if(val=="Not To Schedule")
       {
        let data={ "enginePlanIndicator": "N", "jobId": model.jobId, }
        that.services.updateUnplannedJobsNotSchedule(data).subscribe((res) => {
          that.errorhandling(res)
          // if (res.status == "S")
      
            //scheduler.dataSource.read();
        })
        console.log(val)
       }
       else
       {
        let data={ "enginePlanIndicator": "Y", "jobId": model.jobId, }
        that.services.updateUnplannedJobsNotSchedule(data).subscribe((res) => {
          that.errorhandling(res)
          // if (res.status == "S")

            //scheduler.dataSource.read();
        })
        console.log(val)
       }
      },
      open: function (e) {
        var menu = e.sender;
        menu.remove(".myClass");
        //let grid = kendo.jQuery(that.scheduler.nativeElement).data("kendoGrid");

        var model = grid.dataItem(e.target);
        let text="To Schedule"
        var  menudata = [{ text: "Not To Schedule", cssClass: "myClass" }]
        menu.append(menudata);
      }
    });
    function onChange(arg) {
      var dataItem = grid.dataItem(grid.select());
      that.JobDemandModel = dataItem;
      console.log(arg)
      //that.isNew = true;
      that.cdRef.detectChanges();
    }
    kendo.jQuery("#grid .k-alt").dblclick(function () {

      var dataItem = grid.dataItem(grid.select());
      that.JobDemandModel = dataItem;

      //that.isNew = true;
      that.cdRef.detectChanges();
    });
    function createDropArea(scheduler) {
      scheduler.view().content.kendoDropTargetArea({
        filter: ".k-scheduler-table td, .k-event",
        drop: function (e) {
          var offset = kendo.jQuery(e.dropTarget).offset();
          var slot = scheduler.slotByPosition(offset.left, offset.top);
          var dataItem = grid.dataItem(grid.select());
          console.log(slot, dataItem)
          console.log(slot.element.className, slot.element)
          let classname = slot.element.className
          console.log(classname.indexOf('restrict'))
          if (classname.indexOf('restrict') >= 0)
            alert('restricted')
          else {
            if (dataItem && slot) {
              var d = slot.endDate
              // var offsetMiliseconds = new Date().getTimezoneOffset();
              var newEvent = {
                "jobId": dataItem.jobId,
                "jobType": dataItem.jobType,
                "vesselArrivalConfirmation": dataItem.vesselArrivalConfirmation,
                "taskID": undefined,
                "vesselName": dataItem.vesselName,
                "reProgram": dataItem.reProgram,
                "efficativeCST": dataItem.efficativeCST,
                "minPilotLicenceCode": dataItem.minPilotLicenceCode,
                "typeCode": dataItem.typeCode,
                "vesselGRT": dataItem.vesselGRT,
                "vesselLOA": dataItem.vesselLOA,
                "vesselDraft": dataItem.vesselDraft,
                "vesselTag": dataItem.vesselTag,
                "tugQuantity": dataItem.tugQuantity,
                "vesselType": dataItem.vesselType,
                "locationFromCode": dataItem.locationFromCode,
                "locationToCode": dataItem.locationToCode,
                "priorityId": dataItem.priorityId,
                "priorityCode": dataItem.priorityCode,
                "remarks": dataItem.remarks,
                "agentContactName": dataItem.agentContactName,
                "agentContactNumber": dataItem.agentContactNumber,
                "pilotName": dataItem.pilotName,
                "piloTLicenceCode": dataItem.piloTLicenceCode,
                "pilotMobileNumber": dataItem.pilotMobileNumber,
                "cst": dataItem.cst,
                "title": "No Title",
                "status": true,
                "startTimezone": "",
                "endTimezone": "",
                "recurrenceRule": "",
                "recurrenceException": "",
                "rp": dataItem.rp,
                "isAllDay": false,
                "description": dataItem.remarks,
                "start": slot.startDate,
                "end": slot.endDate,
                "staffRecordId": that.pilotsda[slot.groupIndex].staffRecordId,
                "planStartDate": slot.startDate,
                "planEndDate": slot.endDate,
                "availId": that.pilotsda[slot.groupIndex].availId
              };
              d.setTime(d.getTime() + 40 * 60 * 1000)
              that.services.createjobs({
                "jobId": dataItem.jobId, "minPilotLicenceCode": dataItem.minPilotLicenceCode,
                "staffRecordId": that.pilotsda[slot.groupIndex + 1].staffRecordId, "planStartDate":
                  that.intl.formatDate(slot.startDate, 'dd-MM-yyyy HH:mm'), "availId": that.pilotsda[slot.groupIndex].pilotAvailId,
                "planEndDate": that.intl.formatDate(slot.endDate, 'dd-MM-yyyy HH:mm')
              }).subscribe(
                (res) => {
                  that.errorhandling(res)
                  if (res.status == "S") {
                    grid.dataSource.remove(dataItem);
                    scheduler.dataSource.add(newEvent);
                  }
                })
            }
          }
        }
      });
    }
    function occurrencesInRangeByResource(start, end, resourceFieldName, event, resources) {
      var scheduler = kendo.jQuery(that.scheduler.nativeElement).getKendoScheduler();

      var occurrences = scheduler.occurrencesInRange(start, end);

      var idx = occurrences.indexOf(event);
      if (idx > -1) {
        occurrences.splice(idx, 1);
      }

      event = Object.assign({}, event, resources);

      return filterByResource(occurrences, resourceFieldName, event[resourceFieldName]);
    }

    function filterByResource(occurrences, resourceFieldName, value) {
      var result = [];
      var occurrence;

      for (var idx = 0, length = occurrences.length; idx < length; idx++) {
        occurrence = occurrences[idx];
        if (occurrence[resourceFieldName] === value) {
          result.push(occurrence);
        }
      }
      return result;
    }

    function attendeeIsOccupied(start, end, event, resources) {
      var occurrences = occurrencesInRangeByResource(start, end, "attendee", event, resources);
      if (occurrences.length > 0) {
        return true;
      }
      return false;
    }

    function roomIsOccupied(start, end, event, resources) {
      var occurrences = occurrencesInRangeByResource(start, end, "roomId", event, resources);
      if (occurrences.length > 0) {
        return true;
      }
      return false;
    }

    function checkAvailability(start, end, event, resources) {
      console.log(start, end, event, resources)
      if (attendeeIsOccupied(start, end, event, resources)) {
        setTimeout(function () {
          alert("This person is not available in this time period.");
        }, 0);

        return false;
      }

      if (roomIsOccupied(start, end, event, resources)) {
        setTimeout(function () {
          alert("This room is not available in this time period.");
        }, 0);

        return false;
      }

      return true;
    }
    var gridRowOffset = grid.tbody.find("tr:first").offset();
    grid.table.kendoDraggable({
      filter: "tbody > tr",
      dragstart: function (e) {
        //add margin to position correctly the tooltip under the pointer
        kendo.jQuery("#dragTooltip").css("margin-left", e.clientX - gridRowOffset.left - 50);
      },
      hint: function (row) {
        //remove old selection
        row.parent().find(".k-state-selected").each(function () {
          kendo.jQuery(this).removeClass("k-state-selected")
        })
        //add selected class to the current row
        row.addClass("k-state-selected");
        var dataItem = grid.dataItem(row);
        var tooltipHtml = "<div class='k-event' id='dragTooltip'><div class='k-event-template'>" + kendo.format("{0:t} - {1:t}", dataItem.start, dataItem.end) + "</div><div class='k-event-template'>" + dataItem.title + "</div></div>";
        return kendo.jQuery(tooltipHtml).css("width", 300);
      }
    });
    setTimeout(() => {
      var j = 0;
      // kendo.jQuery(this.contextpilot.nativeElement).kendoContextMenu({
      //   target: ".li span.pilot_details.nav.navbar-nav",
      //   select: function(e) {
      //     console.log(e.target)
      //     var target = kendo.jQuery(e.target);
      //     console.log(target.data("id"))
      //     // if (target.hasClass("k-event")) {
      //     //   var occurrenceByUid = scheduler.occurrenceByUid(target.data("uid"));
      //     //   scheduler.editEvent(occurrenceByUid);
      //     // } else {
      //     //   var slot = scheduler.slotByElement(target);
      //     //   scheduler.addEvent({
      //     //     start: slot.startDate,
      //     //     end: slot.endDate
      //     //   });
      //     // }
      //   },
      //   activate: function(e) {
      //       console.log(e)
      //   },
      //   open: function(e) {
      //     var menu = e.sender;
      //     var text = kendo.jQuery(e.target).hasClass("k-event") ? "Edit event" : "Add Event";
      //     menu.remove(".myClass");
      //     menu.append([{ text: text, cssClass: "myClass" }, { text: "Delete", cssClass: "myClass" }]);
      //   }
      // });
      document.addEventListener('scroll', function (event) {
        if (event.target['className'] === 'k-scheduler-content') {
          if (j !== 2) {
            document.getElementById('pilotscroll')['scrollTop'] = event.target['scrollTop']
            j = 1;
            setTimeout(() => { j = 0 }, 1000)
          }
        }
        if (event.target['id'] === 'pilotscroll') {
          if (j !== 1) {
            kendo.jQuery(".k-scheduler-content").scrollTop(event.target['scrollTop']);
            j = 2;
            setTimeout(() => { j = 0 }, 1000)
          }
        }
      }, true);
    }, 1000);
  }
  close() {
    this.onprompt = false;
    this.pilotopened = false;
    this.ujopen = false;
    this.reopen = false;
    this.deopen = false;
    this.cvopen=false;
    this.fprompt=false;

  }
  closeponr() {
    this.deopen = false;
    scheduler.dataSource.read();
  }
  onDragEnd(event) {
    console.log(event)
    /*    var b = this.pilotsdata[i.index];
        this.pilotsdata.splice(event.index, 0, this.pilotsdata.splice(i.index, 1)[0]);
        console.log(event, i)*/
    this.refreshShedular();
    ///scheduler.dataSource.read()
    // console.log(kendo.jQuery("[data-role=scheduler]").data("kendoScheduler").dataSource)
  }
  refreshShedular() {
    scheduler.resources[0].dataSource.data(this.pilotsda)
    scheduler.refresh();
    //scheduler.dataSource.read();
  }
  onDragStart(event) {
    i = event
  }
  public pilotopened: any = false;
  public addUnavailble() {
    this.ujopen = true;
    console.log(this.ujopen)
    //this.removecontextClick();
  }
  public errorhandling(res) {
    if (res.status == "F") {
      this.onprompt = true;
      this.status = "F";
      var error = res.data;
      var data = []
      error.map((val, index) => {
        data[index] = val.response.split('::')
      })
      console.log(data)
      this.EMessage = "Error"
      this.errormessage = data;
    }
    else {
      this.errormessage = "Updated Successfully"
      this.onprompt = true;
      this.EMessage = "Success"
      this.status = "S"
    }
  }
  public open(item, index) {
    this.index = index;
    var data1 = JSON.parse(JSON.stringify(item))
    data1['shiftEndDate'] = new Date(data1['shiftEndDate'])
    if (data1['specialJobCategories'].length > 0) {
      data1['specialJobCategories'].map((data, index) => {
        data1['specialJobCategories'][index]['lastServicedDate'] = new Date(data.lastServicedDate)
      })
    }
    if (data1.efficativeCST === null) {
      data1.efficativeCST = new Date()
    }
    if (data1.planStartDate === null) {
      data1.planStartDate = new Date()
    }
    if (data1.planEndDate === null) {
      data1.planEndDate = new Date()
    }
    if (data1.deployDate === null) {
      data1.deployDate = new Date()
    }
    if (data1.arriveDate === null) {
      data1.arriveDate = new Date()
    }
    if (data1.onBoardDate === null) {
      data1.onBoardDate = new Date()
    }
    if (data1.startDate === null) {
      data1.startDate = new Date()
    }
    if (data1.endtDate === null) {
      data1.endtDate = new Date()
    }
    if (data1.cst === null) {
      data1.cst = new Date()
    }
    if (data1.srt === null) {
      data1.srt = new Date()
    }
    console.log(data1)
    this.pilotdetails = data1;
    if (this.pilotdetails['operationalReadinessIndicator'] == "Y") {
      this.operationalReadinessIndicator = true;
    } else this.operationalReadinessIndicator = false;
    this.pilotopened = true;
  }
  changeoperationalReadinessIndicator(val) {
    if (val === true) this.pilotdetails['operationalReadinessIndicator'] = "Y";
    else this.pilotdetails['operationalReadinessIndicator'] = "N";
  }
  onStart(event, index) {
    i = event
    this.currentIndex = index
    var vevent: any = kendo.jQuery(event.currentTarget)
    var postion = vevent.position()
    console.log(postion.top)
    event.currentTarget.children['1'].style.top = postion.top + 38 + "px";
  }
  Pioltdatasave($event) {
    this.pilotsdata[this.index] = this.pilotdetails;
    this.cdRef.detectChanges();
    this.services.savePilots(this.pilotdetails).subscribe((res) => {
      this.errorhandling(res)
    })
    jobs.map(val => {
      this.services.savespecialjobs(val).subscribe((res) => {
        console.log(res)
      })
    })
  }
  ujSave(val) { }
  saveList(val) {

    var k = 0,
      found = [];
    if (jobs.length > 0) {
      found = jobs.filter(item => item.eligibilityId === val.eligibilityId);
    }
    if (found[0] == undefined) {
      jobs.push(val)
    }
    found = []
    this.Editspecial = 0;
  }
  saveHandler(val) {
    var that = this
    console.log(this.JobDemandModel)
    this.services.saveplannedJobs(this.JobDemandModel).subscribe((res) => {
      this.errorhandling(res)

    })


  }
}
