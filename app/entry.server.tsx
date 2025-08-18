import type {EntryContext} from '@shopify/remix-oxygen';
import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: any,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://cdn.shopify.com",
      "https://shopify.com",
      "https://forms.inboundrequest.com",
      "https://*.myshopify.com",
      "https://*.shopifycdn.com",
      "https://judge.me",
      "https://*.judge.me",
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://cdn.shopify.com",
      "https://fonts.googleapis.com",
      "https://judge.me",
      "https://*.judge.me",
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https://cdn.shopify.com",
      "https://*.shopifycdn.com",
      "https://judge.me",
      "https://*.judge.me",
    ],
    connectSrc: [
      "'self'",
      "https://monorail-edge.shopifysvc.com",
      "https://jacket-sunscreen.myshopify.com",
      "https://api.shop.app",
      "https://*.myshopify.com",
      "https://rxmqy789nf.execute-api.us-east-2.amazonaws.com",
      "https://judge.me",
      "https://api.judge.me",
      "https://*.judge.me",
      "http://localhost:*",
      "ws://localhost:*",
      "ws://127.0.0.1:*",
      "ws://*.tryhydrogen.dev:*",
    ],
    frameSrc: [
      "'self'",
      "https://forms.inboundrequest.com",
      "https://www.google.com",
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "https://cdn.shopify.com",
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter context={remixContext} url={request.url} nonce={nonce} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);
  
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
