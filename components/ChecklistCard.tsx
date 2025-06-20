import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, FileText, CheckCircle, Calendar } from "lucide-react";

interface ChecklistCardProps {
  id: string;
  title: string;
  category: number;
  onClick?: () => void;
}

const categoryIcons: Record<number, React.ReactNode> = {
  1: <ClipboardList size={40} />,
  2: <FileText size={40} />,
  3: <CheckCircle size={40} />,
  4: <Calendar size={40} />,
};

export function ChecklistCard({ id, title, category, onClick }: ChecklistCardProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      onClick();
    }
  }
  const icon = categoryIcons[category] || <ClipboardList size={40} />;
  return (
    <Card
      id={id}
      className="w-60 h-40 cursor-pointer bg-accent/30 hover:bg-accent/50 relative overflow-hidden"
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
    >
      <CardContent className="flex flex-col items-center justify-center h-full w-full">
        <span className="mb-2">{icon}</span>
        <span className="text-base font-semibold text-center">{title}</span>
      </CardContent>
    </Card>
  );
}
