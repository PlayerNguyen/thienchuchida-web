import { useEffect } from "react";
/**
 * Click outside of the ref
 * @param {*} ref the ref element not to click on them
 * @param {*} callback a callback when click outside
 */
function useClickOutsideRef(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutsideRef;
