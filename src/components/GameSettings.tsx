import {useMineField} from "../contexts/mineField";
import {SubmitHandler, useForm} from "react-hook-form";
import {useGameController} from "../contexts/gameController";
import classes from './GameSettings.module.css';

export type GameSettingsProps = {}

export type GameSettingsInputs = {
    x: number,
    y: number,
}

export const GameSettings = (props: GameSettingsProps) => {

    const { fieldSize } = useMineField();

    const gameController = useGameController();

    const {
        register,
        handleSubmit,
    } = useForm<GameSettingsInputs>();

    const onSubmit: SubmitHandler<GameSettingsInputs> = () => {
        gameController.initGame({ x: 7, y: 7 }, 9);
    };

    return (
        <form className={classes.gameSettings} onSubmit={handleSubmit(onSubmit)}>
            <label>
                X Size
                <input type='number' value={fieldSize.x} {...register('x')} />
            </label>
            <label>
                Y Size
                <input type='number' value={fieldSize.y} {...register('y')} />
            </label>

            <input type="submit" value={'Reset'}/>
        </form>
    );
}