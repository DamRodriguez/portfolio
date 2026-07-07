import { X } from "lucide-react";

type CloseButtonProps = {
  onClose: () => void;
};

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="bg-soft-white dark:bg-strong-black border border-black/15 dark:border-soft-gray/30 rounded-full shadow-s1 w-[2.8rem] h-[2.8rem] xl:w-[3.5rem] xl:h-[3.5rem] flex items-center justify-center cursor-pointer pointer-events-auto dark:hover:border-soft-gray/70 theme-transition-all hover:border-black/50 hover:bg-white-bone/50"
    >
      <X className="w-[1.5rem] h-[1.5rem] xl:w-[1.7rem] xl:h-[1.7rem] stroke-black dark:stroke-soft-white theme-transition-all" />
    </button>
  );
}
