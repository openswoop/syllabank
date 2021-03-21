import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    const meta = {
      title: 'Syllabank (Beta) - UNF Syllabus Bank',
      description: `Online access to syllabi for University of North Florida courses. Know what you're getting into in each of your classes before the semester starts.`,
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/static/meta.png`,
      oembed: `${process.env.NEXT_PUBLIC_BASE_URL}/static/oembed.json`,
    };

    return (
      <Html>
        <Head>
          {/* Primary Meta Tags */}
          <meta name="title" content={meta.title} />
          <meta name="description" content={meta.description} />
          <meta name="theme-color" content="#004b8d" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Syllabank" />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:image" content={meta.image} />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={meta.title} />
          <meta property="twitter:description" content={meta.description} />
          <meta property="twitter:image" content={meta.image} />

          {/* Discord */}
          <link type="application/json+oembed" href={meta.oembed} />

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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
