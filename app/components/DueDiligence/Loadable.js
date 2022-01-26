/**
 *
 * Asynchronously loads the component for DueDiligence
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
