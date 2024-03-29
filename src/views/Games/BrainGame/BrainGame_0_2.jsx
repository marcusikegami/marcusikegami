import { useEffect, useState } from 'react';
import { getWordScore, isWordValid, letterGenerator } from './game';

const BRAIN_GAME_0_2 = () => {
    const [score, setScore] = useState(0);
    const [letterScore, setLetterScore] = useState(0);
    const [time, setTime] = useState(60);
    const [game, setGame] = useState(false);
    const [letters, setLetters] = useState([]);
    const [input, setInput] = useState('');
    const [difficulty, setDifficulty] = useState("3");
    const [wordList, setWordList] = useState([]);
    const [history, setHistory] = useState(() => {
        const localData = localStorage.getItem('game_history') || [];

        return localData ? JSON.parse(localData) : [];
    });

    const startGame = () => {
        setGame(true);
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
        // Define an array of vowels
        const vowels = ['A', 'E', 'I', 'O', 'U'];

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

        // Check if the array contains at least one vowel
        if (!letters.some(letter => vowels.includes(letter))) {
            // Replace a random letter with a random vowel if no vowel is present
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
            letters[randomIndex] = randomVowel;
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

    // update the game history when the state changes
    useEffect(() => {
        const gameHistory = [...history];
        // day month year and time as 00:00
        const date = new Date().toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
        gameHistory.push({date: date, score: score, wordList: wordList});
        localStorage.setItem('game_history', JSON.stringify(gameHistory));
    }, [wordList]);

    return (
        <div>
            <h1 className="font-mono font-semibold text-lg">Brain Game</h1>
            <p>How many words can you make in 60 seconds?</p>

            <div>
                <p>Time: {time}</p>
                <p>Score: {score}</p>
                {!game ? (
                    <div className="flex flex-col justify-center">
                        <div className="my-3">
                            <label className="font-mono font-semibold text-lg mt-6">Difficulty:</label>
                            <select name="difficulty" id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                <option value="Unset">Select a difficulty</option>
                                <option value="3">3 letter minimum</option>
                                <option value="4">4 letter minimum</option>
                                <option value="5">5 letter minimum</option>
                                <option value="6">6 letter minimum</option>
                                <option value="7">7 letter minimum</option>
                            </select>
                    </div>
                        <div className="my-3">
                            <label className="font-mono font-semibold text-lg mt-6">Timer:</label>
                            <select name="timer" id="timer-select" onChange={(e) => setTime(e.target.value)}>
                                <option value="60">60"</option>
                                <option value="45">45"</option>
                                <option value="30">30"</option>
                                <option value="15">15"</option>
                            </select>
                    </div>
                    {difficulty !== "Unset" && (
                        <button onClick={startGame} className="bg-green-500 rounded-sm py-1 px-4 my-3 text-white">Start</button>
                    )}
                    </div>
                ) : (
                <section>
                    <div className="flex flex-col justify-center items-center py-3">
                        <div className="flex justify-center items-center p-5 h-12">
                            <p className="text-lg py-3">{input}</p>
                        </div>
                        <div className="flex">
                        <input id="game-input" type="text" className={`border border-gray-400 rounded-sm py-1 px-4 mx-1 ${input.length < difficulty ? 'bg-red-100' : 'bg-green-200'}`} value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} onKeyDown={(e) => {
                            if (e.key === 'Enter' && input.length >= difficulty && isWordValid(input)) {
                                setWordList((wordList) => [...wordList, {input: input, score: getWordScore(input)}]);
                                setScore((score) => score + getWordScore(input));
                                refreshLetters();
                                setInput('');
                            }
                        }}/>
                        </div>
                    </div>
                    <div className="flex justify-center py-3">
                        <button
                        className="bg-green-500 rounded-sm py-1 px-4 text-white mx-1"
                            onClick={() => {
                                if (input.length >= difficulty && isWordValid(input)) {
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
                    <h2 className="font-mono font-semibold text-lg mt-6">Difficulty: {difficulty} letter minimum</h2>
                </section>
                )}
                <section>
                    <h2 className="font-mono font-semibold text-lg mt-3">Word List</h2>
                    <ul>
                        {wordList.map((word) => (
                            <li key={word.input}>{word.input} - {word.score}</li>
                        ))}
                    </ul>
                </section>
                <section className="h-[25vh] overflow-y-scroll">
                    <h2 className="font-mono font-semibold text-lg mt-3">Game History</h2>
                    <ul>
                        {history ? (history.map((game, index) => (
                            <li key={index}>
                                <p>{game.date}</p>
                                <p>Score: {game.score}</p>
                                <ul>
                                    {game.wordList.map((word, index) => (
                                        <li key={index}>{word.input} - {word.score}</li>
                                    ))}
                                </ul>
                            </li>
                        ))) : (
                            <p>No games played yet</p>
                        )}
                    </ul>
                </section>
                </div>
        </div>
    )
};

export default BRAIN_GAME_0_2;