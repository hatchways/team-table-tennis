import React from 'react';
import { ToolbarProps, Event, EventProps } from 'react-big-calendar';
import { CalendarEvent, CalendarResource } from './interface';
import { Button, Typography } from '@material-ui/core';

export class Toolbar extends React.Component<ToolbarProps<CalendarEvent, CalendarResource>> {
  render() {
    const { label } = this.props;
    return (
      <div className="rbc-toolbar">
        <Typography variant="h4" className="rbc-toolbar-label" style={{ padding: '2vh' }}>
          {label}
        </Typography>
      </div>
    );
  }
}

export class EventComponent extends React.Component<EventProps<Event>> {
  render() {
    const { title, event } = this.props;
    return (
      <div className="rbc-event-content">
        <Button style={{ backgroundColor: event.resource, border: '1.2px solid #d6d6d6' }}></Button>
        <Typography style={{ color: 'black', margin: 'auto' }} className="rbc-toolbar-label">
          {title}
        </Typography>
      </div>
    );
  }
}
