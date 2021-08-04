import React from 'react';
import { ToolbarProps, Event, EventProps } from 'react-big-calendar';
import { CalendarEvent, CalendarResource } from './interface';
import { Typography } from '@material-ui/core';

export class Toolbar extends React.Component<ToolbarProps<CalendarEvent, CalendarResource>> {
  render(): JSX.Element {
    const { label } = this.props;
    return (
      <div className="rbc-toolbar">
        <Typography variant="h4" className="rbc-toolbar-label">
          {label}
        </Typography>
      </div>
    );
  }
}

export class EventComponent extends React.Component<EventProps<Event>> {
  render(): JSX.Element {
    const { title, event } = this.props;
    return (
      <div className="rbc-event-content">
        <div className="rbc-event-color" style={{ backgroundColor: event.resource }}></div>
        <Typography className="rbc-event-label">{title}</Typography>
      </div>
    );
  }
}
