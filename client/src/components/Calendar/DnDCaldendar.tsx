import React from 'react';
import { Calendar, momentLocalizer, ToolbarProps, Event, EventProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useStyles from './useStyles';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { IUserSchedule, mockDatas } from './MockEvent';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

class CalendarEvent {
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

class CalendarResource {
  title: string;
  id: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}

const DnDCalendar = (): JSX.Element => {
  const [events, setEvent] = useState<IUserSchedule[]>(mockDatas);

  const moveEvent = ({ event, start, end }: { event: any; start: any; end: any }): void => {
    const selectedIndex = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(selectedIndex, 1, updatedEvent);

    setEvent(nextEvents);
  };
  return (
    <DragAndDropCalendar
      selectable
      localizer={localizer}
      events={events}
      onDragStart={console.log}
      onEventDrop={moveEvent}
      components={{
        toolbar: Toolbar,
        event: EventComponent,
      }}
      defaultView={'month'}
      defaultDate={new Date(2021, 7, 1)}
      style={{ minHeight: '800px' }}
    />
  );
};

class Toolbar extends React.Component<ToolbarProps<CalendarEvent, CalendarResource>> {
  render() {
    const { label } = this.props;
    return (
      <div className="rbc-toolbar">
        <div className="rbc-toolbar-label">{label}</div>
      </div>
    );
  }
}

class EventComponent extends React.Component<EventProps<Event>> {
  render() {
    const { title, event } = this.props;
    return (
      <div className="rbc-event-content">
        <span style={{ backgroundColor: event.resource, padding: '.2vh 4vh' }}></span>
        <h5>{title}</h5>
      </div>
    );
  }
}

export default DnDCalendar;
