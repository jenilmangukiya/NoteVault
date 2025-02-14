import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import useListNotes from "@/services/notes/useListNotes";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  searchText: string;
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

const NoteGrid = ({ onNoteClick = () => {}, searchText }: NoteGridProps) => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useListNotes({
    userId: user.id,
    page: page - 1,
    searchText,
  });

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!isLoading &&
          data?.notes?.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NoteCard
                title={note.title}
                content={
                  note.isprivate
                    ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum totam repudiandae suscipit iusto aspernatur eaque nihil consequatur soluta tempore a."
                    : note.description
                }
                date={note.created_at}
                isPrivate={note.isprivate}
                onClick={() => onNoteClick(note)}
              />
            </motion.div>
          ))}
      </motion.div>

      {/* Pagination Controls */}
      {!isLoading && data?.count > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page - 1)} />
              </PaginationItem>
            )}

            {Array.from({ length: data?.count }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < data?.count && (
              <PaginationItem>
                <PaginationNext onClick={() => setPage(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default NoteGrid;
