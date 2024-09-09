import React, {useEffect} from "react";
import "./App.css";
import {GameSettings} from "./components/GameSettings";
import Board from "./components/Board";
import {GameControllerProvider, useGameController} from "./contexts/gameController";
import {MineFieldContextProvider} from "./contexts/mineField";
import {ApplyContexts} from "./components/ApplyContexts";
import {Message} from "./components/Message";

const Main = () => {

    const gameController = useGameController();

    useEffect(() => {
        gameController.initGame({ x: 7, y: 7 }, 9);
    }, [])

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '0.5em' }}>
                    <GameSettings/>
                </div>
            </div>
             <Board overlay={gameController.isWon || gameController.isLost && <Message />}/>
        </>
    )
}



const App = () => {
    return (
        <div id="app">
            <ApplyContexts contexts={[
                MineFieldContextProvider,
                GameControllerProvider
            ]}>
                    <Main />
            </ApplyContexts>
        </div>
    );
}

export default App;