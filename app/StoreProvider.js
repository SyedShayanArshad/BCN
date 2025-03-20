"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/features/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const persistorRef = useRef(persistStore(storeRef.current))
  return <Provider store={storeRef.current}>
    <PersistGate persistor={persistorRef.current}>
    {children}

    </PersistGate>
    </Provider>;

}
