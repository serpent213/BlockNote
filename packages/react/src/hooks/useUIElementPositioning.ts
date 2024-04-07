import {
  useDismiss,
  useFloating,
  UseFloatingOptions,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { useEffect, useMemo } from "react";

export function useUIElementPositioning(
  show: boolean,
  referencePos: DOMRect | null,
  zIndex: number,
  options?: Partial<UseFloatingOptions>
) {
  const { refs, update, context, floatingStyles } = useFloating({
    open: show,
    ...options,
  });

  const { isMounted, styles } = useTransitionStyles(context);

  const dismiss = useDismiss(context, {});

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  useEffect(() => {
    update();
  }, [referencePos, update]);

  useEffect(() => {
    // Will be null on initial render when used in UI component controllers.
    if (referencePos === null) {
      return;
    }

    refs.setReference({
      getBoundingClientRect: () => referencePos,
    });
  }, [referencePos, refs]);

  return useMemo(
    () => ({
      isMounted,
      ref: refs.setFloating,
      style: {
        display: "flex",
        ...styles,
        ...floatingStyles,
        zIndex: zIndex,
      },
      getReferenceProps,
      getFloatingProps,
      context,
    }),
    [
      context,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
      isMounted,
      refs.setFloating,
      styles,
      zIndex,
    ]
  );
}
