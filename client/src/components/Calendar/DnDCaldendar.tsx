import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { IUserSchedule, mockDatas } from './MockEvent';
import { useState } from 'react';
import './styles.css';
import { EventComponent, Toolbar } from './extension';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndContext, DndContextType, DndProvider } from 'react-dnd';
import { FetchOptions } from '../../interface/FetchOptions';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

const DnDCalendar = (): JSX.Element => {
  const [events, setEvent] = useState<IUserSchedule[]>(mockDatas);

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const moveEvent = ({ event, start, end }: { event: any; start: any; end: any }): void => {
    const selectedIndex = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(selectedIndex, 1, updatedEvent);

    setEvent(nextEvents);
  };
  
  const GetData = () => {

  };

  const UpdateData = () => {};
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

export default DnDCalendar;
