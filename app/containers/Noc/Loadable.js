/**
 *
 * Asynchronously loads the component for Noc
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
