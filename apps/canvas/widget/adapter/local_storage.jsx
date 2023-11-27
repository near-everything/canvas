function get(ref) {
  if (ref.private) {
    return Storage.privateGet(ref.key);
  } else {
    return Storage.get(ref.key, ref.widgetSrc);
  }
}

function create(data) {
  return new Promise((resolve, reject) => {
    if (data.length) {
      if (data.private) {
        Storage.privateSet(data.key, data.value);
      } else {
        Storage.set(data.key, data.value);
      }
      resolve({ key: data.key, widgetSrc: data.widgetSrc, private: data.private }); // Resolve the promise with the necessary data
    } else {
      reject("No data provided"); // Reject the promise if no data is provided
    }
  });
}

return { get, create };
