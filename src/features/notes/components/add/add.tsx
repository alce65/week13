import { SyntheticEvent, useState } from 'react';
import { useNotes } from '../../hooks/use-notes';

export function Add() {
    const { addNote } = useNotes();

    const [formState, setFormState] = useState({
        title: 'Nota nueva por la cara',
        author: 'Ramón',
        isImportant: true,
    });

    return (
        <form
            onSubmit={(ev: SyntheticEvent) => {
                ev.preventDefault();
                addNote(formState);
            }}
        >
            <button type="submit">Añadir nota</button>
        </form>
    );
}
