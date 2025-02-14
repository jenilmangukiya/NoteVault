import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Lock } from "lucide-react";
import { decryptNote } from "@/lib/utils";

interface NoteEditorModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isEdit: boolean;
  onSave?: (note: {
    title: string;
    content: string;
    isPrivate: boolean;
    password?: string;
    isEdit?: boolean;
    noteId?: string;
  }) => void;
  defaultValues?: {
    title?: string;
    content?: string;
    isPrivate?: boolean;
    password?: string;
  };
  noteId?: string;
}

const NoteEditorModal = ({
  open = true,
  onOpenChange = () => {},
  onSave = () => {},
  isEdit = false,
  defaultValues = {
    title: "",
    content: "",
    isPrivate: false,
  },
  noteId = "",
}: NoteEditorModalProps) => {
  const [title, setTitle] = React.useState(defaultValues.title);
  const [content, setContent] = React.useState(defaultValues.content);
  const [isPrivate, setIsPrivate] = React.useState(defaultValues.isPrivate);
  const [password, setPassword] = React.useState(defaultValues.password);
  console.log("content", content);
  useEffect(() => {
    setTitle(defaultValues.title);
    setIsPrivate(defaultValues.isPrivate);
    setContent(
      defaultValues.isPrivate
        ? decryptNote(defaultValues.content, defaultValues?.password || "")
        : defaultValues.content
    );
    setPassword(defaultValues.password);
  }, [
    defaultValues?.content,
    defaultValues?.isPrivate,
    defaultValues?.title,
    defaultValues?.password,
  ]);

  const handleSave = () => {
    onSave({
      title: title || "Untitled Note",
      content: content || "",
      isPrivate,
      password: isPrivate ? password : undefined,
      isEdit: isEdit,
      noteId: noteId,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-background">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Note" : "Create New Note"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your note here..."
              className="min-h-[200px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="private"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
              <Label htmlFor="private" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Private Note
              </Label>
            </div>
          </div>

          {isPrivate && (
            <div className="grid gap-2">
              <Label htmlFor="password">Password Protection</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password to protect note"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEdit ? "Update Note" : "Save Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteEditorModal;
