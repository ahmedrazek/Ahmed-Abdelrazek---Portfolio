import Image from "next/image";
import {
  BarChart3,
  Bot,
  Car,
  LucideIcon,
  Plane,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";
import type { Project } from "@/content/types";
import type { ProjectMedia } from "@/content/media";
import { cn } from "@/utils/cn";

const icons: Record<string, LucideIcon> = {
  camino: Plane,
  droobna: Car,
  saldwich: UtensilsCrossed,
  tryautomatik: Bot,
  adlyfy: BarChart3,
  "food-safety": ShieldCheck,
};

export const ProjectCover = ({
  project,
  media,
  className,
}: {
  project: Project;
  media: ProjectMedia;
  className?: string;
}) => {
  if (media.cover) {
    return (
      <Image
        src={media.cover}
        width={1440}
        height={900}
        alt={`${project.name} screenshot`}
        className={cn("w-full h-full object-cover object-top", className)}
      />
    );
  }

  const Icon = icons[project.slug] ?? Bot;
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col justify-between p-6 bg-[linear-gradient(135deg,#7c3aed_0%,#1e1b4b_55%,#0ea5e9_130%)]",
        className
      )}
    >
      <Icon className="size-10 text-white/80" aria-hidden />
      <span className="text-2xl md:text-3xl font-bold uppercase leading-tight text-white">
        {project.name}
      </span>
    </div>
  );
};
