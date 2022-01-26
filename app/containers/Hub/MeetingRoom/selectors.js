import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the meetingRoom state domain
 */

const selectMeetingRoomDomain = state => state.meetingRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MeetingRoom
 */

const makeSelectMeetingRoom = () =>
  createSelector(
    selectMeetingRoomDomain,
    substate => substate,
  );

export default makeSelectMeetingRoom;
export { selectMeetingRoomDomain };
