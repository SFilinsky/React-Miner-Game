import {memo} from "react";
import {range} from "../utils/range";
import {useMineField} from "../contexts/mineField";
import {convert2Dto1D} from "../utils/mineCorrdinates";
import {useGameController} from "../contexts/gameController";

import classes from './Board.module.css';

const Board = () => {
    const { fieldSize, mines, mineNeighbourMap} = useMineField();
    const { cellsOpen, check } = useGameController();

    console.log(mines);
    console.log(mineNeighbourMap);

    return (
        <div className={classes.board}>
            <span className={classes.boardLabel}>Board</span>
            {
                range(fieldSize.x).map((x) => (
                    <div key={x} className={classes.boardRow}>
                        {
                            range(fieldSize.y).map((y) => {

                                const key = `${x}${y}`;
                                const index = convert2Dto1D({ x, y }, fieldSize)
                                if (index === null) {
                                    throw Error(`Out of bounds index on the board: ${x}:${y}, field size: ${JSON.stringify(fieldSize)}`);
                                }

                                const isOpen = cellsOpen[index];
                                if (isOpen) {

                                    const isMine = mines[index];
                                    if (isMine) {
                                        return <span key={key} className={classes.boardCell }> * </span>
                                    }

                                    return <span key={key} className={`${classes.boardCell} ${classes.boardCellSafe}`} title={JSON.stringify({ x, y })} >{
                                        mineNeighbourMap[index] === 0 ?
                                            ' '
                                            :
                                            mineNeighbourMap[index]
                                    }</span>
                                }

                                return <span key={key} className={classes.boardCell} title={JSON.stringify({ x, y })}  onClick={() => check({ x, y })}></span>
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default memo(Board);