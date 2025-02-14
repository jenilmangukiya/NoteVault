import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { cx } from "class-variance-authority";

interface NoteCardProps {
  title?: string;
  content?: string;
  date?: string;
  isPrivate?: boolean;
  onClick?: () => void;
  className?: string;
}

const NoteCard = ({
  title = "Untitled Note",
  content = "This is a sample note content. Click to view more...",
  date = new Date().toLocaleDateString(),
  isPrivate = false,
  onClick = () => {},
  className,
}: NoteCardProps) => {
  const dateObj = new Date(date);
  return (
    <Card
      className={cn(
        "w-[380px] h-[220px] cursor-pointer transition-all duration-200 hover:shadow-lg bg-background",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-foreground truncate pr-6">
            {title}
          </h3>
          {isPrivate && (
            <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
        </div>
        <p
          className={cx(
            "text-muted-foreground line-clamp-3 text-ellipsis h-[70px]",
            isPrivate ? "blur-[3px]" : "blur-[0px]"
          )}
        >
          {content}
        </p>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t">
        <p className="text-sm text-muted-foreground">
          {dateObj.toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
