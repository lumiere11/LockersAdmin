import { store } from '@/store';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider >
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>

  )
}
