import {useMineField} from "../contexts/mineField";
import {SubmitHandler, useForm} from "react-hook-form";
import {useGameController} from "../contexts/gameController";
import classes from './GameSettings.module.css';

export type GameSettingsProps = {}

export type GameSettingsInputs = {
    x: number,
    y: number,
    mineCount: number
}

export const GameSettings = (props: GameSettingsProps) => {

    const { fieldSize, mineCount } = useMineField();

    const gameController = useGameController();

    const {
        register,
        handleSubmit,
    } = useForm<GameSettingsInputs>( {
        defaultValues: {
            x: fieldSize.x,
            y: fieldSize.y,
            mineCount: mineCount
        }
    });

    const onSubmit: SubmitHandler<GameSettingsInputs> = (data) => {
        console.log(data);
        gameController.initGame({ x: Number(data.x), y: Number(data.y) }, data.mineCount);
    };

    return (
        <form className={classes.gameSettings} onSubmit={handleSubmit(onSubmit)}>
            <label>
                X Size
                <input type='number' {...register('x')} />
            </label>
            <label>
                Y Size
                <input type='number' {...register('y')} />
            </label>

            <label>
                Mine Count
                <input type='number' {...register('mineCount')} />
            </label>

            <input type="submit" value={'Reset'}/>
        </form>
    );
}