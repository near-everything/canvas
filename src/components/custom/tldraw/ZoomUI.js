import React from "react";
import { useEditor } from "@tldraw/tldraw";
import styled from "styled-components";

const ZoomUI = styled.div`
  position: fixed;
  left: 100px;
  bottom: 0;
  z-index: 599;
  pointer-events: all;
  display: flex;
  flex-direction: row;
  background: hsl(204, 16%, 94%);
  gap: 0.5rem;
  padding: 5px;
  border-radius: 13px 13px 0 0;
  border: 4px solid rgb(249, 250, 251);
  border-bottom: 0;
  button {
    color: #2d2d2d;
    border: none !important;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: transparent;
    font-size: 12px;
    gap: 8px;
    text-shadow: 1px 1px #fff;

    border-radius: 8px !important;

    &:active {
      border-style: inset;
      background-color: #d5d5d5;
      color: #000;
    }

    &:hover {
      background-color: #e5e5e5 !important;
      color: #111 !important;
    }
  }

  @media (max-width: 840px) {
    left: 55px;
  }
  @media (max-width: 690px) {
    display: none;
  }
`;

export const ZoomIn = () => {
  const editor = useEditor();

  return (
    <ZoomUI>
      <button
        onClick={() => {
          editor.zoomIn();
        }}
      >
        <i className="bi bi-plus-lg"></i>
      </button>
      <button
        onClick={() => {
          editor.zoomOut();
        }}
      >
        <i className="bi bi-dash"></i>
      </button>
    </ZoomUI>
  );
};