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

export class ThingShapeUtil extends BaseBoxShapeUtil {
  static type = "thing";

  getDefaultProps() {
    return {
      src: "",
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
    const isEditing = useIsEditing(shape.id);
    const toast = useToasts();

    const html = `
		<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<title>Near social</title>

		<script src="/near-bos-webcomponent/main.a3ef7374a57ed9263007.bundle.js" defer></script>
		<script src="/near-bos-webcomponent/runtime.11b6858f93d8625836ab.bundle.js" defer></script>
	</head>
	<body>
		<near-social-viewer src="${shape.props.src || "efiz.near/widget/Tree"}"></near-social-viewer>
	</body>
</html>
		`;

    return (
      <HTMLContainer className="tl-embed-container" id={shape.id}>
        {shape.props.src ? (
          <iframe
            className="tl-embed"
            srcDoc={html}
            width={toDomPrecision(shape.props.w)}
            height={toDomPrecision(shape.props.h)}
            draggable={false}
            style={{
              border: 0,
              pointerEvents: isEditing ? "auto" : "none",
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
