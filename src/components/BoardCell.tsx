import classes from "./BoardCell.module.css";
import {useGameController} from "../contexts/gameController";
import {convert2Dto1D, FieldPosition} from "../utils/mineCorrdinates";
import {useMineField} from "../contexts/mineField";
import {useTrackResize} from "../utils/useTrackResize";

export type BoardCellProps = {
    position: FieldPosition
}

function BoardCell({ position }: BoardCellProps) {

    const ref = useTrackResize<HTMLSpanElement>();
    const { fieldSize, mines, mineNeighbourMap} = useMineField();
    const { cellsOpen, check } = useGameController();

    const index = convert2Dto1D(position, fieldSize)
    if (index === null) {
        throw Error(`Out of bounds index on the board: ${position.x}:${position.y}, field size: ${JSON.stringify(fieldSize)}`);
    }

    const isOpen = cellsOpen[index];
    const isMine = mines[index];
    const minesNear = mineNeighbourMap[index] !== 0 ? mineNeighbourMap[index] : '';

    const text = isOpen ?
        isMine ?
            '*'
             :
             minesNear
        :
        '';

    return <span
        ref={ref}
        className={`${classes.boardCell} ${isOpen && !isMine ? classes.boardCellSafe : ''}`}
        title={JSON.stringify(position)}
        onClick={() => !isOpen && check(position)}
        style={{
            height: `${ref.current?.clientWidth ?? 0}px`,
            fontSize: `${(ref.current?.clientWidth ?? 0) / 128}em`
        }}
    >{text}</span>
}

export default BoardCell;