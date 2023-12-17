import { computed } from "@tldraw/state";
import { getUserPreferences, setUserPreferences } from "./TLUserPreferences.mjs";
function createTLUser(opts = {}) {
  return {
    derivePresenceState: opts.derivePresenceState ?? (() => computed("presence", () => null)),
    userPreferences: opts.userPreferences ?? computed("userPreferences", () => getUserPreferences()),
    setUserPreferences: opts.setUserPreferences ?? setUserPreferences
  };
}
export {
  createTLUser
};
//# sourceMappingURL=createTLUser.mjs.map
