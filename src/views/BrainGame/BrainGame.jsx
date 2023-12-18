import { useState } from 'react';
import { getWordScore, isWordValid, letterGenerator } from './game';

const BrainGame = () => {
    const [score, setScore] = useState(0);
    const [letterScore, setLetterScore] = useState(0);
    const [time, setTime] = useState(0);
    const [game, setGame] = useState(false);
    const [letters, setLetters] = useState([]);
    const [input, setInput] = useState('');
    const [game_dictionary, setDictionary] = useState([]);
    const [wordList, setWordList] = useState([]);

    const startGame = () => {
        setGame(true);
        setTime(60);
        setScore(0);
        refreshLetters();
        setInput('');

        const timer = setInterval(() => {
            setTime((currentTime) => {
                if (currentTime <= 1) {
                    setGame(false);
                    clearInterval(timer);
                    return 0;
                } else {
                    return currentTime - 1;
                }
            });
        }, 1000);
    };

    const refreshLetters = () => {
         // Generate 8 unique letters
        let letters = [];
        for (let i = 0; i < 10; i++) {
            let letter = letterGenerator();
            // if the letter has two instances in the array, generate a new letter
            while (letters.filter((l) => l === letter).length === 2) {
                letter = letterGenerator();
            }
            letters[i] = letter;
        }
        setLetters(letters);
        // disable the discard button for 2 seconds
        let discardBtn = document.getElementById('discard-button');
        if (!discardBtn) return;
        discardBtn.classList.add('hidden');
        setTimeout(() => {
            discardBtn.classList.remove('hidden');
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
                    <div className="flex justify-center">
                        <button onClick={startGame} className="bg-green-500 rounded-sm py-1 px-4 text-white">Start</button>
                    </div>
                ) : (
                <section>
                    <div className="flex flex-col justify-center items-center py-3">
                        <p className="text-lg py-3">{input}</p>
                        <div className="flex">
                        {letters.map((letter) => (
                            <button
                                className="text-2xl mx-2"
                                key={$`letter` + }
                                onClick={() => {
                                    setInput(input + letter);
                                }}
                            >
                                <div className="p-1 w-5 border-b-black">
                                    <p>
                                        {letter}
                                    </p>
                                </div>
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className="flex justify-center pt-3">
                        <button
                        className="bg-green-500 rounded-sm py-1 px-4 text-white mx-1"
                            onClick={() => {
                                if (isWordValid(input)) {
                                    setWordList((wordList) => [...wordList, {input: input, score: getWordScore(input)}]);
                                    setScore((score) => score + getWordScore(input));
                                    refreshLetters();
                                    setInput('');
                                }
                            }}
                        >
                            Submit
                        </button>
                        <button
                        id="discard-button"
                        className="bg-red-500 rounded-sm py-1 px-4 text-white mx-1"
                            onClick={() => {
                                setInput('');
                                refreshLetters();
                            }}
                        >
                            Discard
                        </button>
                    </div>
                </section>
                )}
                <section>
                    <h2>Word List</h2>
                    <ul>
                        {wordList.map((word) => (
                            <li key={word.input}>{word.input} - {word.score}</li>
                        ))}
                    </ul>
                </section>
                </div>
        </div>
    )
};

export default BrainGame;