import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useStyles from './useStyles';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { IUserSchedule, mockDatas } from './MockEvent';
import { useState } from 'react';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

const DnDCalendar = (): JSX.Element => {
  const [events, setEvent] = useState<IUserSchedule[]>(mockDatas);

  const moveEvent = ({ event, start, end }: { event: any; start: any; end: any }): void => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setEvent(nextEvents);
  };
  return (
    <DragAndDropCalendar
      selectable
      localizer={localizer}
      events={events}
      onEventDrop={moveEvent}
      resizable
      defaultDate={new Date(2021, 7, 1)}
      style={{ minHeight: '600px' }}
    />
  );
};

export default DnDCalendar;
