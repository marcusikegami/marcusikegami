import { useState } from 'react';
import { getWordScore, isWordValid, letterGenerator } from './game';

const BrainGame = () => {
    const [score, setScore] = useState(0);
    const [letterScore, setLetterScore] = useState(0);
    const [time, setTime] = useState(0);
    const [game, setGame] = useState(false);
    const [letters, setLetters] = useState([]);
    const [input, setInput] = useState('');
    const [wordList, setWordList] = useState([]);

    const startGame = () => {
        setGame(true);
        setTime(10);
        setScore(0);
        refreshLetters();
        setInput('');
        setWordList([]);

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
            <h1 className="font-mono font-semibold text-lg">Brain Game</h1>
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
                        <div className="flex justify-center items-center p-5 h-12">
                            <p className="text-lg py-3">{input}</p>
                        </div>
                        <div className="flex">
                        {letters.map((letter, index) => (
                            <button
                                className="text-2xl mx-2 w-5"
                                key={'letter' + index}
                                onClick={(e) => {
                                    setInput(input + letter);
                                    // add a flashing green border to the letter as a transition for 0.25s
                                    e.target.classList.add('text-green-500');
                                    setTimeout(() => {
                                        e.target.classList.remove('text-green-500');
                                    }, 250);
                                }}
                            >
                                <div className="p-1 w-100 border-b-black">
                                    <p className='text-center'>
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
                    <h2 className="font-mono font-semibold text-lg mt-6">Word List</h2>
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