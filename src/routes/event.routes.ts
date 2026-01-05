import { Elysia } from 'elysia';

import EventController from '@/controllers/event.controller';
import { isUserAuthenticated } from '@/middlewares/auth.middleware';

import { queryCollectionModel } from './models/query';

export default (app: Elysia) => {
  return app.group('/events', (group) => {
    group.use(isUserAuthenticated);
    group.get('', EventController.getEvents, { query: queryCollectionModel });
    group.get('/:id/attendees', EventController.getEventAttendees);
    group.post('/:id/attendees/join', EventController.joinEvent);
    group.delete('/:id/attendees/leave', EventController.leaveEvent);
    group.get('/:id', EventController.getEvent);
    group.put('/:id', EventController.updateEvent);
    group.delete('/:id', EventController.deleteEvent);
    group.post('', EventController.createNewEvent);
    group.get('/group/:id', EventController.getEventsByGroupId, { query: queryCollectionModel });

    return group;
  });
};
