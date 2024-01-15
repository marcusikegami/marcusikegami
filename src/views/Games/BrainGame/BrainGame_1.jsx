import { useEffect, useState } from 'react';

const BRAIN_GAME_1 = () => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60);
    const [game, setGame] = useState(false);
    const [input, setInput] = useState('');
    const [difficulty, setDifficulty] = useState("1");
    const [solvedList, setSolvedList] = useState([]);
    const [problem, setProblem] = useState({});
    const [operators, setOperators] = useState(['+']);
    const [history, setHistory] = useState(() => {
        const localData = localStorage.getItem('game_1_history');
        if (localData === null) {
            return [{date: '', score: 0, solvedList: []}];
        }
        return JSON.parse(localData);
    });

    const startGame = () => {
        setGame(true);
        setScore(0);
        refreshProblem();
        setInput('');
        setSolvedList([]);

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

    const refreshProblem = () => {
        const { problem, answer } = problemGenerator();
        setProblem([{problem: problem}, {answer: answer}]);
    };

    const checkAnswer = (value) => {
        if (value === problem.answer) return true
        else return false;
    }

    const problemGenerator = () => {
        // randomly generate two integers based on difficulty (diffculty === 2 means 2 digit numbers)
        const num1 = Math.floor(Math.random() * Math.pow(10, difficulty - 1)) + Math.pow(10, difficulty - 1);
        const num2 = Math.floor(Math.random() * Math.pow(10, difficulty - 1)) + Math.pow(10, difficulty - 1);

        // define operators based off difficulty
        let operators = [];
        switch (operators) {
            case '1':
                operators = ['+'];
                break;
            case '2':
                operators = ['+', '-'];
                break;
            case '3':
                operators = ['+', '-', '*'];
                break;
            case '4':
                operators = ['+', '-', '*', '/'];
                break;
            default:
                operators = ['+'];
        };

        // randomly generate an operator
        const operator = operators[Math.floor(Math.random() * operators.length)];

        // calculate the answer
        let answer;
        switch (operator) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
            default:
        };

        // return the problem and the answer
        return {problem: `${num1} ${operator} ${num2}`, answer: answer};
    };

        // update the game history when the state changes
        useEffect(() => {
            const gameHistory = [...history];
            // day month year and time as 00:00
            const date = new Date().toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
            gameHistory.push({date: date, score: score, solvedList: solvedList});
            localStorage.setItem('game_1_history', JSON.stringify(gameHistory));
        });

        return (
            <div>
                <h1 className="font-mono font-semibold text-lg">Brain Game</h1>
                <p>How many problems can you solve in 60 seconds?</p>

                <div>
                    <p>Time: {time}</p>
                    <p>Score: {score}</p>
                    {!game ? (
                        <div className="flex flex-col justify-center">
                            <div className="my-3">
                                <label className="font-mono font-semibold text-lg mt-6">Difficulty:</label>
                                <select name="difficulty" id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                    <option value="Unset">Select a difficulty</option>
                                    <option value="2">2 digit minimum</option>
                                    <option value="3">3 digit minimum</option>
                                    <option value="4">4 digit minimum</option>
                                    <option value="5">5 digit minimum</option>
                                    <option value="6">6 digit minimum</option>
                                    <option value="7">7 digit minimum</option>
                                </select>

                        </div>
                        <div className="my-3">
                        <label className="font-mono font-semibold text-lg mt-6">Operators:</label>
                                <select name="operators" id="operators-select" value={operators} onChange={(e) => setOperators(e.target.value)}>
                                    <option value="Unset">Select operators</option>
                                    <option value="1">Addition</option>
                                    <option value="2">Addition and Subtraction</option>
                                    <option value="3">Addition, Subtraction, and Multiplication</option>
                                    <option value="4">Addition, Subtraction, Multiplication, and Division</option>
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
                                <p className="text-lg py-3">{problem} {problem.answer}</p>
                            </div>
                            <div className="flex justify-center items-center p-5 h-12">
                                <p className="text-lg py-3">{input}</p>
                            </div>
                            <div className="flex">
                            <input id="game-input" type="text" className={`border border-gray-400 rounded-sm py-1 px-4 mx-1 ${input.length < difficulty ? 'bg-red-100' : 'bg-green-200'}`} value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} onKeyDown={(e) => {
                                if (e.key === 'Enter' && checkAnswer(input)) {
                                    setSolvedList((solvedList) => [...solvedList, problem + ' = ' + input]);
                                    setScore((score) => score + 1);
                                    refreshProblem();
                                    setInput('');
                                }
                            }}/>
                            </div>
                        </div>
                        <div className="flex justify-center py-3">
                            <button
                            className="bg-green-500 rounded-sm py-1 px-4 text-white mx-1"
                                onClick={() => {
                                    if (checkAnswer(input)) {
                                        setSolvedList((solvedList) => [...solvedList, problem + ' = ' + input]);
                                        setScore((score) => score + 1);
                                        refreshProblem();
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
                                    refreshProblem();
                                }}
                            >
                                Discard
                            </button>
                        </div>
                        <h2 className="font-mono font-semibold text-lg mt-6">Difficulty: {difficulty} digit minimum</h2>
                    </section>
                    )}
                    <section>
                        <h2 className="font-mono font-semibold text-lg mt-3">Word List</h2>
                        <ul>
                            {solvedList.map((problem) => (
                                <li key={problem}>{problem.problem} = {problem.answer}</li>
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
                                        {game.solvedList.map((problem, index) => (
                                            <li key={index}>{problem.input}</li>
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

export default BRAIN_GAME_1;