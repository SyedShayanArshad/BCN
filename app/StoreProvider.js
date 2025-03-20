"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/features/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { useSession } from "next-auth/react";

export default function StoreProvider({ children }) {
  const { data: session } = useSession();
  const userId = session?.user?.id || "guest"; 

  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore(userId);
  }

  const persistorRef = useRef(persistStore(storeRef.current));

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
