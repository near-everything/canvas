/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  BaseBoxShapeUtil,
  DefaultSpinner,
  HTMLContainer,
  Icon,
  TLBaseShape,
  stopEventPropagation,
  toDomPrecision,
  useIsEditing,
  useToasts,
} from "@tldraw/tldraw";

export class ResponseShapeUtil extends BaseBoxShapeUtil {
  static type = "response";

  getDefaultProps() {
    return {
      html: "",
      w: (960 * 2) / 3,
      h: (540 * 2) / 3,
    };
  }

  canEdit() {
    return true;
  }

  isAspectRatioLocked() {
    return false;
  }

  canResize() {
    return true;
  }

  canBind() {
    return false;
  }

  component(shape) {
    console.log(
      `shapeId: ${shape.id} of size x: ${toDomPrecision(
        shape.props.w
      )}, and y: ${toDomPrecision(shape.props.h)}`
    );
    const isEditing = useIsEditing(shape.id);
    const toast = useToasts();
    return (
      <HTMLContainer className="tl-embed-container" id={shape.id}>
        {shape.props.html ? (
          <iframe
            id={`iframe-${shape.id}`}
            className="tl-embed"
            srcDoc={shape.props.html}
            width={toDomPrecision(shape.props.w)}
            height={toDomPrecision(shape.props.h)}
            draggable={false}
            style={{
              border: 0,
              pointerEvents: "auto",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "var(--color-muted-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--color-muted-1)",
            }}
          >
            <DefaultSpinner />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: -40,
            height: 40,
            width: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            pointerEvents: "all",
          }}
          onClick={() => {
            if (navigator && navigator.clipboard) {
              navigator.clipboard.writeText(shape.props.html);
              toast.addToast({
                icon: "duplicate",
                title: "Copied to clipboard",
              });
            }
          }}
          onPointerDown={stopEventPropagation}
        >
          <Icon icon="duplicate" />
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
