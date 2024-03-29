import dictionary from './dictionary.json';

export const letterGenerator = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    return randomLetter;
};

export const getLetterScore = (letter) => {
    const letters = {
        A: 1, B: 3, C: 3, D: 2, E: 1,
        F: 4, G: 2, H: 4, I: 1, J: 8,
        K: 5, L: 1, M: 3, N: 1, O: 1,
        P: 3, Q: 10, R: 1, S: 1, T: 1,
        U: 1, V: 4, W: 4, X: 8, Y: 4,
        Z: 10
    };
    return letters[letter];
};

export const getWordScore = (word) => {
    let score = 0;
    for (let i = 0; i < word.length; i++) {
        score += getLetterScore(word[i]);
    }
    return score;
};


// Assuming dictionary.json is a json object of keys (words) and values (definitions) check if they key exists in the dictionary
export const isWordValid = (word) => {
    if (dictionary[word.toLowerCase()]) {
        return true;
    }
    return false;
}
