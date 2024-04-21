import { Widget } from "near-social-vm";
import React from "react";
import { useBosLoaderStore } from "../../../stores/bos-loader";
import { useLocation } from "react-router-dom";

function TopZone({ path }) {
  const redirectMapStore = useBosLoaderStore();
  const location = useLocation();

  return (
    <>
      <Widget
        key={`${path}-topzone`}
        src="everycanvas.near/widget/tldraw.TopZone"
        props={{ path: path, location: location }}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />
    </>
  );
}

export default TopZone;
