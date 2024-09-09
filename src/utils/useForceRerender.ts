import {useReducer} from "react";

export const useForceRerender = () => {
    const [, forceUpdate] = useReducer(x => x + 1, () => 0);

    return forceUpdate;
}