import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteGrid from "../modules/notes/NoteGrid";
import NoteEditorModal from "../modules/notes/NoteEditorModal";
import PasswordPromptModal from "../modules/notes/PasswordPromptModal";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { encryptNote } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [noteDetails, setNoteDetails] = useState(null);
  const { isAuthenticated, user } = useAuth();
  const [showNoteEditor, setShowNoteEditor] = React.useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = React.useState(false);

  const [password, setPassword] = useState(null);

  const handleNoteClick = (note: any) => {
    if (note.isprivate) {
      setPassword(null);
      setNoteDetails(note);
      setShowPasswordPrompt(true);
    } else {
      setNoteDetails(note);
      setShowNoteEditor(true);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    setPassword(password);
    setShowPasswordPrompt(false);
    setShowNoteEditor(true);
  };

  const handleOnSaveNote = async ({
    title,
    content,
    isPrivate,
    password,
    isEdit,
    noteId,
  }) => {
    if (isEdit) {
      try {
        const result = await supabase
          .from("notes")
          .update({
            title: title,
            description: isPrivate ? encryptNote(content, password) : content,
            isprivate: isPrivate,
            userId: user.id,
          })
          .eq("id", noteId);
        if (!result.error) {
          toast({
            title: "Success",
            description: "Note Updated successfully",
          });
        }
      } catch (error) {
        console.error("Error updating Note: ", error);
        toast({
          title: "Error",
          description: "Something went wrong please try again",
        });
      }
    } else {
      try {
        const result = await supabase.from("notes").insert([
          {
            title: title,
            description: isPrivate ? encryptNote(content, password) : content,
            isprivate: isPrivate,
            userId: user.id,
          },
        ]);
        if (!result.error) {
          toast({
            title: "Success",
            description: "Note Created successfully",
          });
        }
      } catch (error) {
        console.error("Error creating Note: ", error);
        toast({
          title: "Error",
          description: "Something went wrong please try again",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Notes App</h1>
          {isAuthenticated && (
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  await supabase.auth.signOut();
                }}
                className="flex items-center gap-2"
                variant="outline"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 pb-0 flex justify-start">
        <Button
          onClick={() => {
            setPassword(null);
            setNoteDetails(null);
            setShowNoteEditor(true);
          }}
          className="flex items-center gap-2 mx-6 "
        >
          <Plus className="h-4 w-4" />
          Add New Note
        </Button>
      </div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isAuthenticated ? (
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
            <Button onClick={() => navigate("/login")}>
              Login or Register
            </Button>
          </div>
        )}
      </main>

      {/* Modals */}

      <NoteEditorModal
        key={noteDetails}
        open={showNoteEditor}
        onOpenChange={setShowNoteEditor}
        onSave={handleOnSaveNote}
        isEdit={!!noteDetails}
        noteId={noteDetails?.id}
        defaultValues={{
          title: noteDetails ? noteDetails.title : "",
          content: noteDetails ? noteDetails.description : "",
          isPrivate: noteDetails ? noteDetails?.isprivate : false,
          password: password,
        }}
      />

      <PasswordPromptModal
        isOpen={showPasswordPrompt}
        onClose={() => setShowPasswordPrompt(false)}
        onSubmit={handlePasswordSubmit}
        title="Enter Note Password"
        key={password + "password"}
      />
    </div>
  );
};

export default Home;
