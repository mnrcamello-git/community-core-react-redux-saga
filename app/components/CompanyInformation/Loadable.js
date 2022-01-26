/**
 *
 * Asynchronously loads the component for CompanyInformation
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
