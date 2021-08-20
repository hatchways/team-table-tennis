import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/useSocketContext';
import { FetchOptions } from '../../interface/FetchOptions';

import { Mevent } from './interface';
import { IUserSchedule, mockDatas } from './MockEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { Toolbar, EventComponent } from './extension';
import { useAuthBoard } from '../../context/useAuthBoardContext';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);
const newArray: IUserSchedule[] = [];

const DnDCalendar = (): JSX.Element => {
  const { loggedInUserBoard: loggedInUser } = useAuthBoard();
  const [userCard, setUserCard] = useState(loggedInUser?.cards);
  const [cardInfos, setCardInfos] = useState<IUserSchedule[]>([]);
  const { initSocket } = useSocket();

  for (const card in userCard) {
    const newObj: IUserSchedule = {
      title: userCard[card].title,
      start: new Date(userCard[card].cardDetails.deadLine),
      end: new Date(userCard[card].cardDetails.deadLine),
      resource: userCard[card].cardDetails.color,
    };
    newArray.push(newObj);
  }

  useEffect(() => {
    initSocket();
  }, [initSocket]);
  useEffect(() => {
    console.log(cardInfos);
    setCardInfos(newArray);
  }, [cardInfos]);

  const moveEvent = ({ event, start, end }: Mevent): void => {
    const selectedIndex = cardInfos.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...cardInfos];
    nextEvents.splice(selectedIndex, 1, updatedEvent);

    setCardInfos(nextEvents);
    // updateEvent();
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
      events={cardInfos}
      onEventDrop={() => moveEvent}
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
