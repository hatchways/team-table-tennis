export interface Mevent {
  event: any;
  start: any;
  end: any;
}

export class CalendarEvent {
  title: string;
  allDay: boolean;
  start: Date;
  endDate: Date;
  desc: string;
  resourceId?: string | undefined;
  tooltip?: string | undefined;

  constructor(_title: string, _start: Date, _endDate: Date, _allDay?: boolean, _desc?: string, _resourceId?: string) {
    this.title = _title;
    this.allDay = _allDay || false;
    this.start = _start;
    this.endDate = _endDate;
    this.desc = _desc || '';
    this.resourceId = _resourceId;
  }
}

export class CalendarResource {
  title: string;
  id: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}
