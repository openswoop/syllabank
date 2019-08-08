// https://github.com/zeit/next.js/blob/canary/examples/with-apollo-auth/lib/redirect.js
import Router from 'next/router';

export default (context, target) => {
  if (context.res) {
    // server
    // 302 Redirect
    context.res.writeHead(302, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};
