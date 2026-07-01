"use client";
import MotionHeight from "@/components/motion/MotionHeight";
import { AnimatedChevron } from "@/components/other/AnimatedChevron";
import { inputClass } from "@/components/ui/inputs/input/Input.style";
import { useClickOutside } from "@/hooks/useClickOutside";
import "@/styles/scrollbarVertical.css";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface BaseOption {
  id: string | number;
}

export type InputComboboxProps<T extends BaseOption> = {
  name?: string;
  options: T[];
  value?: T;
  onChange?: (option: T) => void;
  renderOption: (option: T) => React.ReactNode;
  disabled?: boolean;
  containerClassName?: string;
  error?: boolean;
  placeholder?: string;
  inputClassName?: string;
  optionsContainerClassName?: string;
  optionClassName?: string;
  placeholderClassName?: string;
  placeholderLeftIcon?: React.ReactNode;
  placeholderLeftIconOnInput?: boolean;
};

export const InputCombobox = <T extends BaseOption>({
  name,
  options,
  value,
  onChange,
  renderOption,
  disabled,
  containerClassName,
  error,
  placeholder,
  inputClassName,
  optionsContainerClassName,
  optionClassName,
  placeholderClassName,
  placeholderLeftIcon,
  placeholderLeftIconOnInput,
}: InputComboboxProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | undefined>(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setIsOpen(false));
  const filteredOptions = options.filter((o) => o.id !== selected?.id);

  useEffect(() => {
    if (value && value.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(value);
    } else {
      setSelected(undefined);
    }
  }, [value]);

  const handleSelect = (option: T) => {
    setSelected(option);
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx("relative w-full", containerClassName)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          inputClass({
            hasError: error,
            hasValue: selected?.id !== undefined,
            disabled: disabled,
          }),
          inputClassName,
          "flex items-center justify-between cursor-pointer",
          {
            "!bg-soft-white dark:!bg-black !border-black dark:!border-soft-white/80":
              isOpen,
          },
        )}
      >
        <div className="flex-1 text-left overflow-hidden">
          {selected ? (
            <div className="flex items-center gap-2">
              {placeholderLeftIconOnInput && placeholderLeftIcon}
              {renderOption(selected)}
            </div>
          ) : (
            placeholder && (
              <div className="flex items-center gap-2">
                {placeholderLeftIcon}
                <span
                  className={clsx(
                    "text-black/50 dark:text-soft-gray/50 italic text-sm truncate",
                    placeholderClassName,
                  )}
                >
                  {placeholder}
                </span>
              </div>
            )
          )}
        </div>

        <div className="ml-[1rem] ">
          <AnimatedChevron isOpen={isOpen} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            className={clsx(
              "absolute mt-1 z-50 w-full border border-black dark:border-soft-white/80 shadow-s3 bg-soft-white dark:bg-black rounded-[0.5rem] overflow-hidden text-sm sm:text-base",
              optionsContainerClassName,
            )}
          >
            <MotionHeight duration={0.3}>
              <div
                className={clsx(
                  "max-h-[10.5rem] sm:max-h-[12.5rem] scrollbarCustom overflow-y-auto",
                )}
                data-lenis-prevent
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className={clsx(
                        "py-[0.5rem] px-[1rem] cursor-pointer theme-transition-all duration-150 hover:text-soft-white hover:bg-black dark:hover:bg-soft-white dark:hover:text-black",
                        optionClassName,
                      )}
                    >
                      {renderOption(option)}
                    </div>
                  ))
                ) : (
                  <div className="py-[0.5rem] px-[1rem]">No hay opciones</div>
                )}
              </div>
            </MotionHeight>
          </div>
        )}
      </AnimatePresence>

      <input type="hidden" name={name} value={selected?.id || ""} />
    </div>
  );
};
