function readPasswordCallback() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const type = params.get("type");
  if (type === "recovery" || type === "invite" || params.has("error_code")) {
    return params;
  }
  return null;
}

// Capture the callback before the router interprets the URL fragment.
export let passwordCallback = readPasswordCallback();
if (passwordCallback) {
  window.history.replaceState(window.history.state, "", "/reservations");
}

export function clearPasswordCallback() {
  passwordCallback = null;
}

// A callback can also arrive as a fragment-only navigation in an open tab.
window.addEventListener("hashchange", () => {
  if (readPasswordCallback()) window.location.reload();
});
