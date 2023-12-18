import { useState, } from 'react';
import { checkWord, getWordScore, letterGenerator } from './game';


const BrainGame = () => {
    const [score, setScore] = useState(0);
    const [letterScore, setLetterScore] = useState(0);
    const [time, setTime] = useState(0);
    const [game, setGame] = useState(false);
    const [letter, setLetter] = useState('');
    const [input, setInput] = useState('');

    const startGame = () => {
        setGame(true);
        setTime(60);
        setScore(0);
        setLetter(letterGenerator());
        setInput('');

        const timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer);
                setGame(false);
            }
            setTime((time) => time - 1);
        }, 1000);
    };



    return (
        <div>
            <h1>Brain Game</h1>
            <p>How many words can you make in 60 seconds?</p>

            <div>
                <p>Time: {time}</p>
                <p>Score: {score}</p>
                {!game ? (
                    <button onClick={startGame} className="bg-green-600 rounded-sm p-4">Start</button>
                ) : (

                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (checkWord(input, letter)) {
                                setScore((score) => score + getWordScore(input));
                                setLetter(letterGenerator());
                                setInput('');
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
                )}
                <p>Letter: {letter}</p>
                </div>
        </div>
    )
};

export default BrainGame;