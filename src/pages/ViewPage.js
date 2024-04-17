import { Widget } from "near-social-vm";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
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

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

// export default function ViewPage(props) {
//   useHashRouterLegacy();

//   const { path } = useParams();
//   const query = useQuery();
//   const page = query.get("page");
//   const viewport = query.get("v");

//   const redirectMapStore = useBosLoaderStore();

//   const src = props.widgets.default;

//   return (
//     <Container>
//       <Widget
//         key={src}
//         src={src}
//         props={{ path: path, page: page, viewport: viewport }}
//         config={{
//           redirectMap: redirectMapStore.redirectMap,
//         }}
//       />
//     </Container>
//   );
// }

export default function ViewPage(props) {
  useHashRouterLegacy();

  const { path } = useParams();
  const query = useQuery();
  const page = query.get("page");
  const viewport = query.get("v");

  const redirectMapStore = useBosLoaderStore();

  const src = props.widgets.default;

  return (
    <Container>
      <Widget
        key={src}
        src={src}
        props={{
          path: path ?? "every.near",
          page: page,
          viewport: viewport,
        }}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />
    </Container>
  );
}
