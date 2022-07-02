import { useEffect } from 'react';
import { useNotes } from '../../hooks/use-notes';
import { Add } from '../add/add';

export function List() {
    const { notes, loadNotes, deleteNote } = useNotes();

    useEffect(() => {
        loadNotes();
    }, [loadNotes]);

    return (
        <>
            <Add></Add>
            <ul>
                {notes.map((item) => (
                    <li key={item.id}>
                        {item.title}
                        <span
                            onClick={() => {
                                deleteNote(item);
                            }}
                        >
                            🗑️
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}
