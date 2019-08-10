// https://github.com/zeit/next.js/blob/canary/examples/with-apollo-auth/lib/redirect.js
import Router from 'next/router';

export default (res, target) => {
  if (res) {
    // server
    // 302 Redirect
    res.writeHead(302, { Location: target });
    res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};
