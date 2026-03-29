import clsx from "clsx";
import { toast } from "react-toastify";
import { CloseIcon } from "@/components/icons/header";

interface ToastProps {
  type: "error" | "success" | "warning" | "info";
  text: string;
  closeToast: () => void;
  manualClose?: boolean
}

const toastItems: Record<
  ToastProps["type"],
  {
    title?: string;
    textClassName: string;
    bgClassName: string;
  }
> = {
  error: {
    textClassName: "",
    bgClassName: "",
  },
  success: {
    textClassName: "",
    bgClassName: "",
  },
  warning: {
    textClassName: "",
    bgClassName: "",
  },
  info: {
    textClassName: "",
    bgClassName: "",
  },
};

const CustomCloseButton = ({ closeToast }: { closeToast: () => void }) => (
  <button onClick={closeToast} className="cursor-pointer">
    <CloseIcon className="w-[1rem] h-[1rem] fill-black dark:fill-soft-white" />
  </button>
);

const Toast = ({ type, text, closeToast, manualClose }: ToastProps) => {
  const toastItem = toastItems[type];

  return (
    <div
      className={clsx(
        "w-full flex justify-between items-center px-[0.75rem] py-[0.5rem]",
        toastItem.bgClassName,
      )}
    >
      <div className="flex flex-col w-full pr-[0.5rem] ">
        {toastItem.title && (
          <p
            className={clsx("text-[1rem] font-medium", toastItem.textClassName)}
          >
            {toastItem.title}
          </p>
        )}
        <p className="text-base lg:text-lg text-black dark:text-soft-white font-fira-code">{text}</p>
      </div>
      {manualClose && (
        <CustomCloseButton closeToast={closeToast} />
      )}
    </div>
  );
};

const showToast = (type: ToastProps["type"], text: ToastProps["text"], manualClose?: ToastProps["manualClose"]) => {
  toast[type](
    ({ closeToast }) => (
      <Toast text={text} type={type} closeToast={closeToast} manualClose={manualClose} />
    ),
    {
      position: "bottom-left",
      autoClose: 2500,
      closeButton: false,
    },
  );
};

export default showToast;
