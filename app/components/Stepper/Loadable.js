/**
 *
 * Asynchronously loads the component for Stepper
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
