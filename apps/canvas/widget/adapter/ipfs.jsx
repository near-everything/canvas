const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

function get(ref) {
  const data = fetch(`https://ipfs.near.social/ipfs/${ref.cid}`);
  return data.body;
}

function create(data) {
  // it must be json
  if (data.length) {
    const body = new Blob([data], { type: "application/json" });
    console.log(body);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      return { cid: res.body.cid };
    });
  }
}

return { get, create };

// props.fileType ||
//   initState({
//     json: props.data ?? "",
//   });

// const UploadJson = () => {
//   if (state.json.length) {
//     const body = new Blob([state.json], { type: "application/json" });
//     console.log(body);
//     asyncFetch("https://ipfs.near.social/add", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//       },
//       body,
//     }).then((res) => {
//       const cid = res.body.cid;
//       console.log("CID", cid);
//       State.update({
//         file: {
//           cid,
//         },
//       });
//     });
//   } else {
//     State.update({
//       file: null,
//     });
//   }
// };

// const onChangeName = (name) => {
//   State.update({
//     name,
//   });
// };

// function generateUID() {
//   return (
//     Math.random().toString(16).slice(2) +
//     Date.now().toString(36) +
//     Math.random().toString(16).slice(2)
//   );
// }

// const thingId = state.name ?? generateUID();

// const handleCreate = () => {
//   const hyperfile = {
//     thing: {
//       [thingId]: {
//         "": JSON.stringify({
//           fileformat: props.fileformat,
//           source: "IPFS",
//           adapter: "hack.near/widget/adapter.ipfs",
//           reference: {
//             cid: state.file.cid,
//           },
//         }),
//       },
//     },
//   };

//   Social.set(hyperfile);
// };

// return (
//   <>
//     <textarea
//       className="form-control mb-3"
//       rows={5}
//       value={state.json}
//       onChange={(e) => {
//         state.json = e.target.value;
//         State.update();
//       }}
//     />
//     <a type="button" class="btn btn-success" onClick={() => UploadJson()}>
//       Upload
//     </a>
//     <br />
//     {state.file && (
//       <div>
//         <br />
//         Your file:
//         <a href={ipfsUrl(state.file.cid)}>{state.file.cid}</a>
//         <br />
//         <h5 className="mt-3">Name</h5>
//         <input
//           type="text"
//           value={state.name}
//           onChange={(e) => onChangeName(e.target.value)}
//         />
//         <button className="btn btn-outline-success mt-3" onClick={handleCreate}>
//           Create
//         </button>
//       </div>
//     )}
//   </>
// );
