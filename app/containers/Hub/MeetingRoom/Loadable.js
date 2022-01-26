/**
 *
 * Asynchronously loads the component for MeetingRoom
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
