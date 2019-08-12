import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import LogRocket from 'logrocket';

export default class MyApp extends App {
  componentDidMount() {
    // Add client-side error monitoring
    if (process.env.NODE_ENV === 'production') {
      LogRocket.init('681uqe/syllabank-prod');
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Syllabank</title>
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.6.3/js/all.js"
            integrity="sha384-EIHISlAOj4zgYieurP0SdoiBYfGJKkgWedPHH4jCzpCXLmzVsw1ouK59MuUtP4a1"
            crossOrigin="anonymous"
          />
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}
