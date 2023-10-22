import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper, makeStore } from "@/store";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const persistor = persistStore(makeStore())
  return (
      <Provider store={store}>
          {/*<Component {...props.pageProps} />*/}
          {/* @ts-ignore 此处对应store/index.ts中store.__persistor的设置 */}
          <PersistGate persistor={persistor} loading={null}>
              <Component {...props.pageProps} />
          </PersistGate>
      </Provider>

  )
}
