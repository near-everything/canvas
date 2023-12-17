const compareSchemas = (a, b) => {
  if (a.schemaVersion > b.schemaVersion) {
    return 1;
  }
  if (a.schemaVersion < b.schemaVersion) {
    return -1;
  }
  if (a.storeVersion > b.storeVersion) {
    return 1;
  }
  if (a.storeVersion < b.storeVersion) {
    return -1;
  }
  for (const key of Object.keys(a.recordVersions)) {
    const aRecordVersion = a.recordVersions[key];
    const bRecordVersion = b.recordVersions[key];
    if (aRecordVersion.version > bRecordVersion.version) {
      return 1;
    }
    if (aRecordVersion.version < bRecordVersion.version) {
      return -1;
    }
    if ("subTypeVersions" in aRecordVersion && !("subTypeVersions" in bRecordVersion)) {
      return 1;
    }
    if (!("subTypeVersions" in aRecordVersion) && "subTypeVersions" in bRecordVersion) {
      return -1;
    }
    if (!("subTypeVersions" in aRecordVersion) || !("subTypeVersions" in bRecordVersion)) {
      continue;
    }
    for (const subType of Object.keys(aRecordVersion.subTypeVersions)) {
      const aSubTypeVersion = aRecordVersion.subTypeVersions[subType];
      const bSubTypeVersion = bRecordVersion.subTypeVersions[subType];
      if (aSubTypeVersion > bSubTypeVersion) {
        return 1;
      }
      if (aSubTypeVersion < bSubTypeVersion) {
        return -1;
      }
    }
  }
  return 0;
};
export {
  compareSchemas
};
//# sourceMappingURL=compareSchemas.mjs.map
