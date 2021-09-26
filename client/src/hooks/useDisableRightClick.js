import { useEffect } from "react";

/**
 * The hooks that disable right click in client side
 */
function useDisableRightClick() {
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    document.body.addEventListener(
      "dragover",
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      },
      false
    );
    document.body.addEventListener(
      "drop",
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      },
      false
    );
  }, []);
}

export default useDisableRightClick;
