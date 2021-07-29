import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useStyles from './useStyles';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { mockDatas } from './MockEvent';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

const DnDCalendar = (): JSX.Element => {
  const moveEvent = () => {
    console.log('');
  };
  return (
    <DragAndDropCalendar
      selectable
      localizer={localizer}
      events={mockDatas}
      onEventDrop={moveEvent}
      resizable
      defaultDate={new Date(2021, 7, 0)}
    />
  );
};

export default DnDCalendar;
