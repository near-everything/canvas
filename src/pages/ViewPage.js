import { Widget } from "near-social-vm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHashRouterLegacy } from "../hooks/useHashRouterLegacy";
import { useQuery } from "../hooks/useQuery";
import { useBosLoaderStore } from "../stores/bos-loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  align-items: stretch;
`;

export default function ViewPage(props) {
  useHashRouterLegacy();

  const { widgetSrc } = useParams();
  const query = useQuery();
  const [widgetProps, setWidgetProps] = useState({});
  const redirectMapStore = useBosLoaderStore();

  const src =
    widgetSrc || window?.InjectedConfig?.defaultWidget || props.widgets.default;
  const showMenu = !window?.InjectedConfig?.hideMenu;
  const setWidgetSrc = props.setWidgetSrc;
  const viewSourceWidget = props.widgets.viewSource;

  useEffect(() => {
    setWidgetProps(Object.fromEntries([...query.entries()]));
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      setWidgetSrc(
        src === viewSourceWidget && query.get("src")
          ? {
              edit: query.get("src"),
              view: null,
            }
          : {
              edit: src,
              view: src,
            }
      );
    }, 1);
  }, [src, query, setWidgetSrc, viewSourceWidget]);

  return showMenu ? (
    <Container>
      <Widget
        key={src}
        src={src}
        props={widgetProps}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />
    </Container>
  ) : (
    <Widget
      key={src}
      src={src}
      props={widgetProps}
      config={{
        redirectMap: redirectMapStore.redirectMap,
      }}
    />
  );
}
