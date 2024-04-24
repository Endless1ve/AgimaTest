import { onMounted } from "vue";

export function useIntersectionObserver(observerRef, callback) {
  function observeElement(el) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    });

    observer.observe(el);
  }

  observeElement(observerRef);
}
