import {createContext, PropsWithChildren, useCallback, useContext, useState} from "react";
import {
    convert1Dto2D,
    convert2Dto1D,
    FieldPosition,
    FieldSize,
    NEIGHBOUR_DIRECTIONS,
} from "../utils/mineCorrdinates";

type MineField = {
    mineCount: number,
    mines: boolean[],
    mineNeighbourMap: number[],
    fieldSize: FieldSize,
    changeField: (newFieldSize: FieldSize, mineCount: number, newMines: boolean[]) => void
}

const defaultValue: MineField = {
    mineCount: 0,
    mines: [],
    mineNeighbourMap: [],
    fieldSize: { x: 0, y: 0 },
    changeField: () => {}
}

const MineFieldContext = createContext<MineField>(defaultValue);

export const MineFieldContextProvider = ({ children }: PropsWithChildren) => {
    const [ fieldSize, setFieldSize ] = useState<FieldSize>(defaultValue.fieldSize);
    const [ mineCount, setMineCount ] = useState<number>(defaultValue.mineCount);
    const [ mines, setMines ] = useState<boolean[]>(defaultValue.mines);
    const [ mineNeighbourMap, setMineNeighbourMap ] = useState<number[]>(defaultValue.mineNeighbourMap);

    const changeField: MineField['setMines'] = useCallback((newFieldSize, newMineCount, newMines) => {
        setFieldSize(newFieldSize);
        setMineCount(newMineCount);
        setMines(newMines);
        setMineNeighbourMap(newMines.map((isMine, index) => {
            const minePosition = convert1Dto2D(index, newFieldSize);
            if (minePosition === null) {
                throw Error('Out of bounds mine');
            }
            return NEIGHBOUR_DIRECTIONS.reduce(
                (acc: number, neighbourDirection) => {
                    const neighbourPosition: FieldPosition = {
                        x: minePosition.x + neighbourDirection.x,
                        y: minePosition.y + neighbourDirection.y,
                    };
                    const neighbourIndex = convert2Dto1D(neighbourPosition, newFieldSize);
                    return neighbourIndex !== null && newMines[neighbourIndex] ?
                        acc + 1
                        :
                        acc
                }, 0
            )
        }));
    }, []);

    return (
        <MineFieldContext.Provider value={{
            fieldSize,
            mineCount,
            mines,
            mineNeighbourMap,
            changeField
        }}>
          {children}
        </MineFieldContext.Provider>
    );
}

export const useMineField = () => useContext(MineFieldContext);