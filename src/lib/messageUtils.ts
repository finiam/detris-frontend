import appState from "src/stores/appState";

const setState = appState.setState;

function addMessageListener() {
  window.addEventListener("message", (event: MessageEvent) => {
    if (event.origin !== "https://ipfs.io") return;

    if (event.data === "finished") {
      setState("finished");
    } else if (event.data === "started") {
      setState("playing");
    }
  });
}

export { addMessageListener };
