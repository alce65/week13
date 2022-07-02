import {
    Action,
    AnyAction,
    configureStore,
    Reducer,
    ThunkAction,
} from '@reduxjs/toolkit';
import { iNote } from '../features/notes/models/note';

import counterReducer from '../features/counter/counterSlice';
import {
    // notesReducer,
    notesReducer2,
} from '../features/notes/reducer/notes.reducer';

export const store = configureStore({
    preloadedState: {
        counter: {
            value: 0,
            status: 'idle',
        },
        notes: [],
        // notes2: [],
    },
    reducer: {
        counter: counterReducer,
        notes: notesReducer2 as Reducer<iNote[], AnyAction>,
        // notes2: notesReducer2,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
