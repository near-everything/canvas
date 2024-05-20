import { Widget, useAccountId } from "near-social-vm";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useHashRouterLegacy } from "../hooks/useHashRouterLegacy";
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
  const history = useHistory();

  const { path } = useParams();

  if (!path) {
    // default to every.near
    history.push("/every.near");
  }

  const redirectMapStore = useBosLoaderStore();

  const src = props.widgets.default;

  return (
    <Container>
      <Widget
        key={src}
        src={src}
        props={{
          path: path,
        }}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />
    </Container>
  );
}
