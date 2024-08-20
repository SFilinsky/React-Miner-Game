import {createContext, PropsWithChildren, useContext, useState} from "react";
import {useMineField} from "./mineField";
import {
    convert1Dto2D,
    convert2Dto1D,
    FieldPosition,
    FieldSize,
    NEIGHBOUR_DIRECTIONS,
} from "../utils/mineCorrdinates";

type GameController = {
    initGame: (fieldSize: FieldSize, mineCount: number) => void,
    check: (position: FieldPosition) => void,
    cellsOpen: boolean[],
    isLost: boolean,
    isWon: boolean,
}

const GameControllerContext = createContext<GameController>({
    initGame: () => {},
    check: () => {},
    cellsOpen: [],
    isLost: false,
    isWon: false
});

export const GameControllerProvider = ({ children }: PropsWithChildren) => {

    const { changeField, mines, mineNeighbourMap, fieldSize } = useMineField();

    const [ cellsOpen, setCellsOpen ] = useState<boolean[]>([]);
    const [ isLost, setIsLost ] = useState(false);
    const [ isWon, setIsWon ] = useState(false);

    const initGame: GameController['initGame'] = (fieldSize, mineCount) => {
        const newMines = Array<boolean>(fieldSize.x * fieldSize.y).fill(false);
        const newMinesOpen = Array<boolean>(fieldSize.x * fieldSize.y).fill(false);

        let minesAllocated = 0;
        while (minesAllocated < mineCount) {
            const mineX = Math.floor(Math.random() * fieldSize.x);
            const mineY = Math.floor(Math.random() * fieldSize.y);
            const index = convert2Dto1D({ x: mineX, y: mineY }, fieldSize);
            if (!newMines[index]) {
                newMines[index] = true;
                minesAllocated++;
            }
        }

        setIsWon(false);
        setIsLost(false);
        setCellsOpen(newMinesOpen);
        changeField(fieldSize, mineCount, newMines);
    }

    const check: GameController['check'] = (position) => {

        const index = convert2Dto1D(position, fieldSize);
        if (index === null) {
            return;
        }

        const mine = mines[index];
        if (mine) {
            setIsLost(true);
            cellsOpen.fill(true);
            setCellsOpen([...cellsOpen]);
            return;
        }

        let queue = [ index ];
        let i = 0;
        while (i < queue.length) {

            const currIndex = queue[i];
            i++;

            // Open current cell
            cellsOpen[currIndex] = true;

            // Leave when has mine near
            const isHavingMinesNear = mineNeighbourMap[currIndex] !== 0;
            if (isHavingMinesNear) {
                continue;
            }

            // Go over neighbours and add empty cells into queue
            const currPosition = convert1Dto2D(currIndex, fieldSize);
            if (currPosition === null) {
                throw Error('Out of bounds position in check queue');
            }

            NEIGHBOUR_DIRECTIONS.forEach(direction => {
                const neighbourPosition = {
                    x: currPosition.x + direction.x,
                    y: currPosition.y + direction.y
                }
                const neighbourIndex = convert2Dto1D(neighbourPosition, fieldSize);
                if (neighbourIndex === null) {
                    return;
                }
                const isMine = mines[neighbourIndex];
                const isOpen = cellsOpen[neighbourIndex]
                if (!isMine && !isOpen) {
                    console.log('Entered');
                    queue.push(neighbourIndex);
                }
            });
        }
        setCellsOpen([...cellsOpen]);
    }

    return (
        <GameControllerContext.Provider value={{
            initGame,
            check,
            cellsOpen,
            isLost,
            isWon
        }}>
            { children }
        </GameControllerContext.Provider>
    )
}

export const useGameController = () => useContext(GameControllerContext);