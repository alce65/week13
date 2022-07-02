import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';

import { iNote } from '../models/note';
import * as api from '../services/http-notes';
import * as act from '../reducer/notes.action.creators';
import { useCallback, useEffect } from 'react';

export function useNotes() {
    const notes = useSelector(function (state: RootState) {
        return state.notes;
    });
    const dispatch = useDispatch();

    const loadNotes = useCallback(() => {
        api.getAllNotes().then((data) => {
            dispatch(act.loadNotesAction(data));
        });
    }, [dispatch]);

    const addNote = (newNote: iNote) => {
        api.addNote(newNote).then((data) => {
            dispatch(act.addNoteAction(data));
        });
    };

    const deleteNote = (note: iNote) => {
        api.deleteNote(note.id).then((resp) => {
            if (resp.ok) {
                dispatch(act.deleteNoteAction(note));
            }
        });
    };

    return {
        notes,
        loadNotes,
        addNote,
        deleteNote,
    };
}
