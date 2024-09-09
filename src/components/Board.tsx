import {memo, ReactNode} from "react";
import {range} from "../utils/range";
import {useMineField} from "../contexts/mineField";

import classes from './Board.module.css';
import BoardCell from "./BoardCell";
import {useTrackResize} from "../utils/useTrackResize";

export type BoardProps = {
    overlay: ReactNode
}

const Board = ({ overlay }: BoardProps) => {
    const { fieldSize} = useMineField();
    const overlayRef = useTrackResize<HTMLDivElement>();

    return (
        <div className={classes.board}>
            <span className={classes.boardLabel}>Board</span>
            <div className={classes.boardContainer}>
                <div ref={overlayRef} className={classes.boardOverlay} style={{
                    height: `${overlayRef.current?.clientWidth}px`,
                }}>{overlay}</div>
                <div className={classes.boardCells} style={{
                    gridTemplateRows: `repeat(${fieldSize.x}, 1fr)`,
                    gridTemplateColumns: `repeat(${fieldSize.y}, 1fr)`,
                }}>
                    {
                        range(fieldSize.x).map((x) => (
                            range(fieldSize.y).map((y) => (
                                    <React.Fragment key={`${x}${y}`}>
                                        <BoardCell position={{x, y}}/>
                                    </React.Fragment>
                                )
                            )))
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Board);