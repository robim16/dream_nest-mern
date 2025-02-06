import {configureStore} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import state from './state'


const persistConfig = { 
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, state);

export const store = configureStore({   
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE]
        }
    })
});

let persistor = persistStore(store);
