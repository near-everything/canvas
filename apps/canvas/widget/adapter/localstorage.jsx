const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

function get(ref) {
  const data = fetch(`https://ipfs.near.social/ipfs/${ref.cid}`);
  return data.body;
}

function create(data) {
  return new Promise((resolve, reject) => {
    if (data.length) {
      const body = new Blob([data], { type: "application/json" });
      console.log(body);

      asyncFetch("https://ipfs.near.social/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body,
      })
      .then(res => {
        resolve({ cid: res.body.cid }); // Resolve the promise with the necessary data
      })
      .catch(error => {
        console.error("Error in create function:", error);
        reject(error); // Reject the promise in case of an error
      });
    } else {
      reject("No data provided"); // Reject the promise if no data is provided
    }
  });
}

return { get, create };
