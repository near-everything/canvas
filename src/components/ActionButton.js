/**
 * this is your action -- it's what happens after you click the black button.
 *
 * what do you want it to do?
 *
 * This one opens up a modal, acts as an API for shapes on the canvas (make an api?)
 * then closes the modal
 *
 */
import { getSvgAsImage, useEditor } from "@tldraw/tldraw";
import { Widget } from "near-social-vm";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useBosLoaderStore } from "../stores/bos-loader";

const StyledActionButton = styled.div`
  position: fixed;
  z-index: 1000;
  border-radius: 50%;
  cursor: pointer;
  background: radial-gradient(circle at 30% 30%, #4a4949, #000000);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06),
    0px 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease; // smooth transition

  &:hover {
    background: radial-gradient(circle at 70% 30%, #4a4949, #000000);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    transform: scale(0.98) translateY(4px); // scale down slightly and move downward
  }

  &:active {
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.2);
    transform: scale(0.96) translateY(6px); // more scale down and more downward movement for click
  }

  /* Desktop and Tablet */
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
    right: 30px;
    bottom: 50px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
    right: 15px;
    bottom: 110px;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1002;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  float: right;
`;

function Modal({ onClose, children }) {
  return (
    <ModalBackdrop>
      <ModalBox>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </ModalBox>
    </ModalBackdrop>
  );
}

export function ActionButton() {
  const [isModalOpen, setModalOpen] = useState(false);
  const redirectMapStore = useBosLoaderStore();

  const editor = useEditor();
  const snapshot = editor.store.getSnapshot();

  const selectedShapes = editor.getSelectedShapes();
  const selectedShapeIds = editor.getSelectedShapeIds();

  const deleteShapes = useCallback((shapes) => {
    editor.deleteShapes(shapes);
  }, []);

  const getShapePageBounds = useCallback((shape) => {
    return editor.getShapePageBounds(shape);
  }, []);

  const getSelectedShapeIds = useCallback(() => {
    return editor.getSelectedShapeIds();
  }, []);

  const getSelectedShapes = useCallback(() => {
    return editor.getSelectedShapes();
  }, []);

  const createShapeId = useCallback(() => {
    createShapeId();
  }, []);

  const createShape = useCallback((shape) => {
    editor.createShape(shape);
  }, []);

  const updateShape = useCallback((shape) => {
    editor.updateShape(shape);
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const asSvg = useCallback(async (shapes) => {
    const svg = await editor.getSvg(shapes);
    return svg;
  }, []);

  const asPng = useCallback(async (svg) => {
    const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    );
    const blob = await getSvgAsImage(svg, IS_SAFARI, {
      type: "png",
      quality: 1,
      scale: 1,
    });
    return blob;
  }, []);

  const asDataUrl = useCallback(async (blob) => {
    const dataUrl = await blobToBase64(blob);
    return dataUrl;
  }, []);

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  return (
    <>
      <StyledActionButton onClick={toggleModal} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Widget
            key="everycanvas.near/widget/magic"
            src="everycanvas.near/widget/magic"
            props={{
              selectedShapes,
              selectedShapeIds,
              deleteShapes,
              getShapePageBounds,
              createShapeId,
              createShape,
              updateShape,
              asSvg,
              asPng,
              asDataUrl,
              snapshot: JSON.stringify(snapshot),
            }}
            config={{
              redirectMap: redirectMapStore.redirectMap,
            }}
          />
        </Modal>
      )}
    </>
  );
}
