import {useGameController} from "../contexts/gameController";

import classes from './Message.module.css';

export const Message = () => {

    const { isWon, isLost} = useGameController();

    if (isWon) {
        return <div className={classes.message}>
            Won!
        </div>
    }

    if (isLost) {
        return <div className={classes.message}>
            Lost ;(
        </div>
    }

    return (
        <></>
    )

}