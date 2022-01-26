/**
 *
 * Asynchronously loads the component for Hub
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
