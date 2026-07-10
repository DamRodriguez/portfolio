"use client";
import { PopUp } from "@/components/pop-up/PopUp";
import { useEffect, useRef } from "react";

type VideoPopUpProps = {
  video: string;
  onClose: () => void;
  lockScroll?: boolean;
};

export const VideoPopUp = ({ video, onClose, lockScroll }: VideoPopUpProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!video || !videoElement) return;

    videoElement.play().catch(() => {});

    return () => {
      videoElement?.pause();
      if (videoElement) {
        videoElement.currentTime = 0;
      }
    };
  }, [video]);

  return (
    <PopUp
      isOpen={!!video}
      onClose={onClose}
      lockScroll={lockScroll}
      containerClassName="border-soft-white/10 border shadow-s1 rounded-[0.5rem] xl:rounded-2xl overflow-hidden rounded-tr-[1.3rem] xl:rounded-tr-[2rem] w-fit mx-auto"
      closeButtonClassName="m-2"
    >
      <video ref={videoRef} src={video} controls playsInline />
    </PopUp>
  );
};
