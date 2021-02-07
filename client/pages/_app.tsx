import App from 'next/app';
import { wrapper } from '../redux/store';

import '../css/styles.css';

export default wrapper.withRedux(App);
