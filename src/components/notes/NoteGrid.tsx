import React from "react";
import NoteCard from "./NoteCard";
import { motion } from "framer-motion";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  isPrivate: boolean;
}

interface NoteGridProps {
  notes?: Note[];
  onNoteClick?: (noteId: string) => void;
}

const defaultNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes",
    content:
      "Discussed project timeline and deliverables for Q2. Key points include...",
    date: "2024-03-15",
    isPrivate: true,
  },
  {
    id: "2",
    title: "Shopping List",
    content: "1. Groceries\n2. Household items\n3. Office supplies",
    date: "2024-03-16",
    isPrivate: false,
  },
  {
    id: "3",
    title: "Project Ideas",
    content:
      "New feature concepts for the application: 1. Dark mode 2. Export functionality",
    date: "2024-03-17",
    isPrivate: false,
  },
];

const NoteGrid = ({
  notes = defaultNotes,
  onNoteClick = () => {},
}: NoteGridProps) => {
  return (
    <div className="w-full min-h-screen bg-background p-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {notes.map((note) => (
          <motion.div
            key={note.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NoteCard
              title={note.title}
              content={note.content}
              date={note.date}
              isPrivate={note.isPrivate}
              onClick={() => onNoteClick(note.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default NoteGrid;
