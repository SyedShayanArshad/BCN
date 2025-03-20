import { combineReducers,configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import customersReducer from "@/lib/features/Customer/customerSlice"
import listsReducer from "@/lib/features/List/listSlice";
const persistConfig = {
    key:"root",
  storage,
}
const rootReducer = combineReducers({
    customers: customersReducer,
    lists: listsReducer,

})
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore redux-persist action types that contain non-serializable values
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
