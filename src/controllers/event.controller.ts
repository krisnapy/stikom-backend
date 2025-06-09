import { error } from 'elysia';

import { Event } from '@/db/schemas';
import {
  findAllAttendeesByEventId,
  joinEventById,
  leaveEventById,
} from '@/db/services/attendee.services';
import {
  createEvent,
  deleteEventById,
  findAllEvents,
  findEventById,
  updateEventById,
  cancelEventById,
} from '@/db/services/event.services';
import { ElysiaContext } from '@/types/elysia-context.types';

type EventContext = ElysiaContext<Event>;

const createNewEvent = async ({ body, set }: EventContext) => {
  try {
    const event = await createEvent(body);

    set.status = 201;

    return { message: 'Event created', event };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getEvents = async ({ query }: EventContext) => {
  try {
    const events = await findAllEvents(query);

    return { message: 'Events fetched', events };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getEvent = async ({ params }: EventContext) => {
  try {
    const event = await findEventById(params.id);

    return { message: 'Event fetched', event };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const updateEvent = async ({ params, body }: EventContext) => {
  try {
    const event = await updateEventById(params.id, body);

    return { message: 'Event updated', event };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const deleteEvent = async ({ params }: EventContext) => {
  try {
    const event = await deleteEventById(params.id);

    return { message: 'Event deleted', event };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const joinEvent = async ({ params, user }: EventContext) => {
  try {
    const event = await joinEventById(params.id, user.id);

    return { message: 'Event joined', event };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const leaveEvent = async ({ params, user }: EventContext) => {
  try {
    const event = await leaveEventById(params.id, user.id);

    return { message: 'Event left', event };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const getEventAttendees = async ({ params, query }: EventContext) => {
  try {
    const attendees = await findAllAttendeesByEventId(params.id, query);

    return { message: 'Attendees fetched', attendees };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

const cancelEvent = async ({ params }: EventContext) => {
  try {
    const event = await cancelEventById(params.id);

    return { message: 'Event cancelled', event };
  } catch (err) {
    return error(500, { message: 'Internal server error', error: err });
  }
};

export default {
  createNewEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  getEventAttendees,
  cancelEvent,
};
