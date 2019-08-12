import React from 'react';
import redirect from '../../lib/redirect';

export default class extends React.Component {
  static async getInitialProps({ res }) {
    redirect(res, '/');
    return {};
  }
}