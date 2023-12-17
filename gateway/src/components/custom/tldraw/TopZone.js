import { Widget } from "near-social-vm";
import React from "react";
import { useBosLoaderStore } from "../../../stores/bos-loader";

function TopZone({ path }) {
  const redirectMapStore = useBosLoaderStore();

  return (
    <>
      <Widget
        key={`${path}-topzone`}
        src="everycanvas.near/widget/tldraw.TopZone"
        props={{ path: path }}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />
    </>
  );
}

export default TopZone;
