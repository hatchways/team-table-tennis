import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { FetchOptions } from '../../interface/FetchOptions';

import { Mevent } from './interface';
import { IUserSchedule, mockDatas } from './MockEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { Toolbar, EventComponent } from './extension';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

const DnDCalendar = (): JSX.Element => {
  const [events, setEvent] = useState<IUserSchedule[]>(mockDatas);
  const { loggedInUserBoard: loggedInUser } = useAuth();
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

  const moveEvent = ({ event, start, end }: Mevent): void => {
    const selectedIndex = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(selectedIndex, 1, updatedEvent);

    setEvent(nextEvents);
    // updateEvent();
  };

  const getEvent = async () => {
    const fetchOptions: FetchOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    return await fetch(`/`, fetchOptions)
      .then((res) => res.json())
      .catch(() => ({
        error: { message: 'Unable to connect to server. Please try again' },
      }));
  };

  const updateEvent = async () => {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
      credentials: 'include',
    };
    return await fetch(`/`, fetchOptions)
      .then((res) => res.json())
      .catch(() => ({
        error: { message: 'Unable to connect to server. Please try again' },
      }));
  };
  return (
    <DragAndDropCalendar
      selectable
      timeslots={2}
      localizer={localizer}
      events={events}
      onEventDrop={moveEvent}
      components={{
        toolbar: Toolbar,
        event: EventComponent,
      }}
      popup={true}
      defaultView={'month'}
      defaultDate={new Date(2021, 7, 1)}
      style={{ minHeight: '800px' }}
    />
  );
};

export default DnDCalendar;
