import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
const SentryInit = (app, router) => {
  Sentry.init({
    app,
    dsn: "https://2dce2e26fbfa462db44644e817afa440@o4504027579613184.ingest.sentry.io/4504027581317122",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
};
export { SentryInit };
