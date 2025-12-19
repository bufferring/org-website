import { useEffect } from 'react';

export default function useSectionObserver(id, targetRef) {
  useEffect(() => {
    const node = targetRef?.current;
    if (!id || !node) {
      return undefined;
    }

    node.dataset.sectionId = id;

    return () => {
      if (node.dataset.sectionId === id) {
        delete node.dataset.sectionId;
      }
    };
  }, [id, targetRef]);
}
