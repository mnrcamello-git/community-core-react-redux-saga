/**
 *
 * Asynchronously loads the component for SocketComponent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
