import React, { useEffect, useState } from "react";
import { Widget } from "near-social-vm";
import { createShapeId, useEditor } from "@tldraw/tldraw";

export default function Thing({ isModalOpen, setModalOpen, onMount, onDestroy, src, props }) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      typeof onMount === "function" && onMount();
    } else {
      typeof onDestroy === "function" && onDestroy();
    }
  }, [isModalOpen]);

  return (
    <Widget
      key={src}
      src={src}
      props={props}
    />
  );
}
