import {useEffect, useRef} from "react";
import {useForceRerender} from "./useForceRerender";

export const useTrackResize =<ElementType extends Element>() => {

    const rerender = useForceRerender();

    const elRef = useRef<ElementType | null>(null);

    useEffect(() => {
        const el = elRef.current;
        if (el === null) {
            return;
        }

        const obs = new ResizeObserver(() => {
            rerender();
        });
        obs.observe(el);

        return () => obs.disconnect();
    }, [elRef.current])

    return elRef;
}