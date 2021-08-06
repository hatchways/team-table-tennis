import React from 'react';
import { ToolbarProps, Event, EventProps } from 'react-big-calendar';
import { Typography } from '@material-ui/core';

export const Toolbar: React.FC<ToolbarProps> = ({ label }): JSX.Element => {
  return (
    <div className="rbc-toolbar">
      <Typography variant="h4" className="rbc-toolbar-label">
        {label}
      </Typography>
    </div>
  );
};

export const EventComponent: React.FC<EventProps<Event>> = ({ event, title }): JSX.Element => {
  return (
    <div className="rbc-event-content">
      <div className="rbc-event-color" style={{ backgroundColor: event.resource }}></div>
      <Typography className="rbc-event-label">{title}</Typography>
    </div>
  );
};
