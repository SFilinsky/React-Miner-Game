import {useGameController} from "../contexts/gameController";

import classes from './Message.module.css';
import {useTrackResize} from "../utils/useTrackResize";

export const Message = () => {

    const { isWon, isLost} = useGameController();
    const ref = useTrackResize<HTMLSpanElement>();

    const isDisplayed = isWon || isLost;
    console.log(isDisplayed, ref.current)

    return (
        <span ref={ref}
              className={classes.message}
              style={{
                  fontSize: `${(ref.current?.clientWidth ?? 0) / 256}em`
              }}
        >
            { isWon ?
                <span>WON</span>
                :
                isLost ?
                    <span>LOST</span>
                    :
                    ''
            }
        </span>
    );
}