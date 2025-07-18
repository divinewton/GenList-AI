import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, ShoppingCart, ListChecks, ClipboardList, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChecklistCardProps {
  id: string;
  title: string;
  category: number;
  date: string;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

const categoryIcons: Record<number, React.ReactNode> = {
  1: <Briefcase size={40} />,
  2: <ShoppingCart size={40} />,
  3: <ListChecks size={40} />,
  4: <ClipboardList size={40} />,
};

export function ChecklistCard({ id, title, category, date, onClick, onDelete }: ChecklistCardProps) {
  const icon = categoryIcons[category] || <ClipboardList size={40} />;
  const router = useRouter();

  function handleDelete(e: React.MouseEvent) {
    toast("Checklist Deleted", {
      description: title,
      icon: <Trash2 className="text-destructive" />,
    });
    e.stopPropagation();
    // Remove from localStorage
    const existing = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
    const updated = existing.filter((item: any) => item.id !== id);
    localStorage.setItem("savedChecklists", JSON.stringify(updated));
    if (onDelete) onDelete(id);
  }

  return (
    <Card
      id={id}
      className="w-60 h-40 cursor-pointer hover:bg-background/50 relative overflow-hidden group"
      tabIndex={0}
      role="button"
      onClick={() => {
        router.push(`/results?list=${id}`)
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none dark:hidden"
        style={{
          background: "linear-gradient(94deg, rgba(88, 219, 174, 0.50) 7.18%, rgba(150, 221, 196, 0.50) 92.82%)",
          opacity: 0.5
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
        style={{
          background: "linear-gradient(274deg, rgba(34, 104, 79, 0.50) 7.18%, rgba(36, 168, 122, 0.50) 92.82%)",
          opacity: 0.5
        }}
      />
      <button
        className="absolute top-2 right-2 z-20 p-1 opacity-0 group-hover:opacity-100 trash-mobile transition-opacity"
        aria-label="Delete"
        onClick={handleDelete}
      >
        <Trash2 size={20} className="text-foreground hover:text-foreground/50 cursor-pointer"/>
      </button>
      <CardContent className="flex flex-col items-center justify-center h-full w-full">
        <span className="mb-2 text-primary">{icon}</span>
        <span className="text-base font-semibold text-center">{title}</span>
        <div className="text-sm text-center mt-2 opacity-50">
            <p>
              {(() => {
              const now = new Date();
              const inputDate = new Date(date);
              const diffMs = now.getTime() - inputDate.getTime();
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

              if (diffDays === 0) {
                return "Today";
              } else if (diffDays === 1) {
                return "Yesterday";
              } else if (diffDays < 7) {
                return `${diffDays} days ago`;
              } else if (diffDays < 14) {
                return "Last week";
              } else if (diffDays < 365) {
                const weeks = Math.floor(diffDays / 7);
                return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
              } else if (diffDays < 730) {
                return "Last year";
              } else {
                const years = Math.floor(diffDays / 365);
                return `${years} years ago`;
              }
              })()}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
