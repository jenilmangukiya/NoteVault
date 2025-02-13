import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AuthModal from "./auth/AuthModal";
import NoteGrid from "./notes/NoteGrid";
import NoteEditorModal from "./notes/NoteEditorModal";
import PasswordPromptModal from "./notes/PasswordPromptModal";

interface HomeProps {
  isAuthenticated?: boolean;
  onLogin?: (data: { email: string; password: string }) => void;
  onRegister?: (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

const Home = ({
  isAuthenticated = false,
  onLogin = () => {},
  onRegister = () => {},
}: HomeProps) => {
  const [showAuthModal, setShowAuthModal] = React.useState(!isAuthenticated);
  const [showNoteEditor, setShowNoteEditor] = React.useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = React.useState(false);
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(
    null,
  );

  const handleNoteClick = (noteId: string) => {
    // For demo purposes, show password prompt for the first note only
    if (noteId === "1") {
      setSelectedNoteId(noteId);
      setShowPasswordPrompt(true);
    } else {
      setSelectedNoteId(noteId);
      setShowNoteEditor(true);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    // Demo password check
    if (password === "demo") {
      setShowPasswordPrompt(false);
      setShowNoteEditor(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Notes App</h1>
          {isAuthenticated && (
            <Button
              onClick={() => setShowNoteEditor(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Note
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <NoteGrid onNoteClick={handleNoteClick} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Welcome to Notes App
            </h2>
            <p className="text-muted-foreground text-center max-w-md">
              Create and manage your notes with password protection. Login or
              register to get started.
            </p>
            <Button onClick={() => setShowAuthModal(true)}>
              Login or Register
            </Button>
          </div>
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={onLogin}
        onRegister={onRegister}
      />

      <NoteEditorModal
        open={showNoteEditor}
        onOpenChange={setShowNoteEditor}
        onSave={(note) => {
          console.log("Saving note:", note);
          setShowNoteEditor(false);
        }}
        defaultValues={{
          title: selectedNoteId === "1" ? "Meeting Notes" : "",
          content:
            selectedNoteId === "1"
              ? "Discussed project timeline and deliverables for Q2. Key points include..."
              : "",
          isPrivate: selectedNoteId === "1",
        }}
      />

      <PasswordPromptModal
        isOpen={showPasswordPrompt}
        onClose={() => setShowPasswordPrompt(false)}
        onSubmit={handlePasswordSubmit}
        title="Enter Note Password"
      />
    </div>
  );
};

export default Home;
