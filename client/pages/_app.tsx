import App from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import LogRocket from 'logrocket';

import '../css/styles.css';

export default class MyApp extends App {
  componentDidMount(): void {
    // Add client-side error monitoring
    if (process.env.NODE_ENV === 'production') {
      LogRocket.init('681uqe/syllabank-prod');
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Head>
          <title>Syllabank</title>
          {process.env.NODE_ENV === 'production' && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
              window['_fs_debug'] = false;
              window['_fs_host'] = 'fullstory.com';
              window['_fs_org'] = 'NF1BY';
              window['_fs_namespace'] = 'FS';
              (function(m,n,e,t,l,o,g,y){
                  if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
                  g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
                  o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_host+'/s/fs.js';
                  y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
                  g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
                  g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
                  g.log = function(a,b) { g("log", [a,b]) };
                  g.consent=function(a){g("consent",!arguments.length||a)};
                  g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
                  g.clearUserCookie=function(){};
              })(window,document,window['_fs_namespace'],'script','user');
              `,
              }}
            />
          )}
        </Head>
        <Component {...pageProps} />
      </div>
    );
  }
}