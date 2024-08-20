export type FieldSize = { x: number, y: number };
export type FieldPosition = { x: number, y: number };

export const FOUR_NEIGHBOUR_DIRECTIONS: FieldPosition[] = [
    { x:  1, y:  0 },
    { x: -1, y:  0 },
    { x:  0, y:  1 },
    { x:  0, y: -1 },
]

export const NEIGHBOUR_DIRECTIONS: FieldPosition[] = [
    ...FOUR_NEIGHBOUR_DIRECTIONS,
    { x:  1, y:  1 },
    { x: -1, y:  1 },
    { x:  1, y: -1 },
    { x: -1, y: -1 },
];


export const convert2Dto1D = (position: FieldPosition, fieldSize: FieldSize): number | null => {
    if (position.x < 0 || position.x >= fieldSize.x) {
        return null;
    }
    if (position.y < 0 || position.y >= fieldSize.y) {
        return null;
    }
    return position.y * fieldSize.x + position.x;
}

export const convert1Dto2D = (index: number, fieldSize: FieldSize): FieldPosition | null => {
    if (index < 0 || index >= fieldSize.x * fieldSize.y) {
        return null;
    }
    const y = Math.floor(index / fieldSize.x);
    const x = index - (y * fieldSize.x);
    return { x, y };
}