/**
 *
 * Asynchronously loads the component for UserManagement
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
