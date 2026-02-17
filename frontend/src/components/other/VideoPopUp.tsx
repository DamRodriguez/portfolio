"use client";
import { useRef, useEffect } from "react";
import { SourcePopUp } from "./SourcePopUp";

type VideoPopUpProps = {
  video: string;
  onClose: () => void;
};

export const VideoPopUp = ({ video, onClose }: VideoPopUpProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!video || !videoElement) return;

    videoElement.play().catch(() => { });

    return () => {
      videoElement?.pause();
      if (videoElement) {
        videoElement.currentTime = 0
      }
    };
  }, [video]);

  return (
    <SourcePopUp
      source={video}
      onClose={onClose}
    >
      <video
        ref={videoRef}
        src={video}
        controls
        playsInline
      />
    </SourcePopUp>
  );
};
