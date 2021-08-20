import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/useSocketContext';
import { FetchOptions } from '../../interface/FetchOptions';

import { Mevent } from './interface';
import { IUserSchedule } from './MockEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { Toolbar, EventComponent } from './extension';
import { useAuthBoard } from '../../context/useAuthBoardContext';
import { Card } from '../../interface/CardApi';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);
let newArray: IUserSchedule[] = [];

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
      cardId: userCard[card]._id,
    };
    newArray.push(newObj);
  }

  useEffect(() => {
    initSocket();
  }, [initSocket]);
  useEffect(() => {
    newArray = [];
    setCardInfos(newArray);
  }, [cardInfos]);

  const moveEvent = ({ event, start, end }: Mevent): void => {
    const selectedIndex = cardInfos.findIndex((item) => item.cardId === event.cardId);

    const updatedEvent = { ...event, start, end };

    const nextEvents = [...cardInfos];
    nextEvents.splice(selectedIndex, 1, updatedEvent);

    setCardInfos(nextEvents);
    updateEvent(start, event.cardId);
  };
  const updateEvent = async (date: Date, eventId: string) => {
    const fetchOptions: FetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: date,
        cardId: eventId,
      }),
      credentials: 'include',
    };
    return await fetch(`/calendar/updateCalendar`, fetchOptions)
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
      onEventDrop={moveEvent}
      components={{
        toolbar: Toolbar,
        event: EventComponent,
      }}
      popup={true}
      defaultView={'month'}
      defaultDate={new Date(2021, 7, 1)}
      style={{ height: '900px' }}
    />
  );
};

export default DnDCalendar;
