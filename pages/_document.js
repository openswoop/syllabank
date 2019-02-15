import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

  render() {
    return (
      <html>
        <Head>
          <script defer src="https://use.fontawesome.com/releases/v5.6.3/js/all.js"
            integrity="sha384-EIHISlAOj4zgYieurP0SdoiBYfGJKkgWedPHH4jCzpCXLmzVsw1ouK59MuUtP4a1"
            crossOrigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument;