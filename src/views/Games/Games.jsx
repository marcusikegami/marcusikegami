import { Link } from "react-router-dom";

const Games = () => {
    return (
        <div className="w-5/6 flex flex-col">
            <Link
                className="py-1 px-2 text-blue-800 rounded ease-in-out duration-300 hover:text-blue-600 hover:underline"
                to="/braingame"
            >
                Brain Game (v. 0.1) [Babel Flash - Now above 5 letters!]
            </Link>
            <Link
                className="py-1 px-2 text-blue-800 rounded ease-in-out duration-300 hover:text-blue-600 hover:underline"
                to="/braingame/0_2"
            >
                Brain Game (v. 0.2) [Timed "Vocabulary" Test]
            </Link>
            <Link
                className="py-1 px-2 text-blue-800 rounded ease-in-out duration-300 hover:text-blue-600 hover:underline"
                to="/braingame/1"
            >
                Brain Game (v. 1.0) [Timed Math Test]
            </Link>
            <p>Note: These games utilize Webster's Dictionary (EN) for word validation.</p>
        </div>
    );
}

export default Games;