import Document, {Head, Main, NextScript} from 'next/document';
import React from "react";

class MyDocument extends Document {

  render() {
    return (
      <html>
      <Head>
        <title>Syllabank</title>
        <script defer src="https://use.fontawesome.com/releases/v5.6.3/js/all.js"
                integrity="sha384-EIHISlAOj4zgYieurP0SdoiBYfGJKkgWedPHH4jCzpCXLmzVsw1ouK59MuUtP4a1"
                crossOrigin="anonymous"/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    )
  }
}

export default MyDocument;