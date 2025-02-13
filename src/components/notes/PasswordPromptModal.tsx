import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface PasswordPromptModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (password: string) => void;
  isError?: boolean;
  title?: string;
}

const PasswordPromptModal = ({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  isError = false,
  title = "Enter Password",
}: PasswordPromptModalProps) => {
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            animate={isError ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Input
              type="password"
              placeholder="Enter password to view note"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full ${isError ? "border-destructive" : ""}`}
              autoFocus
            />
            {isError && (
              <p className="text-sm text-destructive mt-2">
                Incorrect password. Please try again.
              </p>
            )}
          </motion.div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Unlock</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordPromptModal;
