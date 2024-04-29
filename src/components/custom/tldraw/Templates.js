import styled from "styled-components";
import { useEditor, AssetRecordType } from "@tldraw/tldraw";
import React, { useState } from "react";
const DropdownContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #bcbbbf;
  padding: 0.5rem;
  display: flex;
  border-radius: 13px;
  gap: 0.5rem;
  margin-bottom: 1rem;
  img {
    border-radius: 13px;
    cursor: pointer;
  }

  @media (max-width: 870px) {
    right: 0;
    transform: translateX(25%);
    top: 0;
    flex-direction: column;
    width: max-content;
    height: max-content;
  }
`;
const TemplateUI = styled.div`
  position: fixed;
  left: 172px;
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
    padding: 6px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: transparent;
    font-size: 12px;
    gap: 8px;
    text-shadow: 1px 1px #fff;

    border-radius: 4px !important;

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
`;

const templates = [
  {
    src: "https://i.pinimg.com/736x/17/60/1e/17601e367e1689524f531c775c80d497.jpg",
    type: "jpg",
    width: 736,
    height: 952,
  },
  {
    src: "https://png.pngtree.com/template/20210809/ourmid/pngtree-cute-simple-note-template-design-image_561822.jpg",
    type: "jpg",
    width: 328,
    height: 405,
  },
];

const handleImageClick = (
  editor,
  imageUrl,
  imageType,
  imageHeight,
  imageWidth
) => {
  const assetId = AssetRecordType.createId();
  editor.createAssets([
    {
      id: assetId,
      type: "image",
      typeName: "asset",
      props: {
        name: imageUrl,
        src: imageUrl,
        w: imageWidth,
        h: imageHeight,
        mimeType: `image/${imageType}`,
        isAnimated: false,
      },
      meta: {},
    },
  ]);
  editor.createShape({
    type: "image",
    x: (window.innerWidth - imageWidth) / 2,
    y: (window.innerHeight - imageHeight) / 2,
    props: {
      assetId,
      w: imageWidth,
      h: imageHeight,
    },
  });
};

const TemplateDropdown = ({ editor }) => (
  <>
    {templates.map((item) => (
      <div
        key={item.src}
        onClick={() => {
          handleImageClick(
            editor,
            item.src,
            item.type,
            item.height,
            item.width
          );
          // setDropdown(!dropdown);
        }}
      >
        <img
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
          src={item.src}
          alt={`Template ${item.src}`}
        />
      </div>
    ))}
  </>
);

export function Templates() {
  const editor = useEditor();
  const [dropdown, setDropdown] = useState(false);

  return (
    <TemplateUI>
      <div className="position-relative">
        <button
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <i className="bi bi-easel"></i>
        </button>
        {dropdown && (
          <DropdownContent>
            <TemplateDropdown editor={editor} />
          </DropdownContent>
        )}
      </div>
    </TemplateUI>
  );
}
