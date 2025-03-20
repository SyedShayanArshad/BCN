import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import customersReducer from "@/lib/features/Customer/customerSlice";
import listsReducer from "@/lib/features/List/listSlice";

const createPersistConfig = (userId) => ({
  key: userId ? `persist:user-${userId}` : "persist:guest",
  storage,
});

const rootReducer = combineReducers({
  customers: customersReducer,
  lists: listsReducer,
});

export const makeStore = (userId) => {
  const persistConfig = createPersistConfig(userId);
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
            "persist/PAUSE",
            "persist/FLUSH",
            "persist/PURGE",
            "persist/REGISTER",
          ],
        },
      }),
  });
};
