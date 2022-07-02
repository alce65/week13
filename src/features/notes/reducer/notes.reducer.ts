// Flux ´Redux
// Una función pura (no depende ni mdifica nada externo)
// Recibe un estado y una acción, retorna un nuevo estado

import { createReducer } from '@reduxjs/toolkit';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';

import { iNote } from '../models/note';
import { iAction } from './notes.action.creators';
import { actionTypes } from './notes.action.types';

type actionNotes = Array<iNote> | iNote;

const initialState: Array<iNote> = [];
export const notesReducer2 = createReducer(initialState, (builder) => {
    return builder
        .addCase(actionTypes['notes@load'], (state, action) => {
            return (action as iAction<Array<iNote>>).payload;
        })
        .addCase(actionTypes['notes@add'], (state, action) => {
            return [...state, (action as iAction<iNote>).payload];
        })
        .addCase(actionTypes['notes@update'], (state, action) => {
            return state.map((item) =>
                item.id === (action as iAction<iNote>).payload.id
                    ? (action as iAction<iNote>).payload
                    : item
            );
        })
        .addCase(actionTypes['notes@delete'], (state, action) => {
            return state.filter(
                (item) => item.id !== (action as iAction<iNote>).payload.id
            );
        })
        .addDefaultCase((state) => state);
});

export function notesReducer(
    previousState: Array<iNote>,
    action: iAction<actionNotes>
) {
    let state: Array<iNote> = initialState;
    switch (action.type) {
        case actionTypes['notes@load']:
            state = action.payload as Array<iNote>;
            break;
        case actionTypes['notes@add']:
            state = [...previousState, action.payload as iNote];
            break;
        case actionTypes['notes@delete']:
            state = previousState.filter(
                (item) => item.id !== (action.payload as iNote).id
            );
            break;
        case actionTypes['notes@update']:
            state = previousState.map((item) =>
                item.id === (action.payload as iNote).id
                    ? (action.payload as iNote)
                    : item
            );
            break;
        default:
            state = previousState;
    }

    return state;
}
