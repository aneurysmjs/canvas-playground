import { componentStack } from "@/lib/renderer/internals.js";

const useMount = (callback: () => void) => {
  console.log("componentStack", componentStack);

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        callback();
        observer.disconnect();
        break;
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
  };
};

export default useMount;
