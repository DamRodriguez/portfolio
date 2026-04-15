"use client"
// @ts-ignore
import { Bubble } from "@typebot.io/react";

const Typebot = () => {
  return (
    <Bubble
      typebot="portfolio-juk8mm7"
      apiHost="https://typebot.io"
      previewMessage={{
        message: "Clickeame para asistirte!",
        autoShowDelay: 5000,
      }}
      theme={{
        button: {
          backgroundColor: "#000",
          customIconSrc:
            "https://s3.typebotstorage.com/public/workspaces/cmnq9jso1000804jmu172hw7q/typebots/cmnq9kaql000b04l1ajuk8mm7/bubble-icon?v=1775708744503",
        },
      }}
    />
  );
};

export default Typebot;
