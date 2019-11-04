import StoreDev from './store.dev';
import StorePro from './store.prod';

export default __DEV__ ? StoreDev : StorePro;