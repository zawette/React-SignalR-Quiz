export let steps = {
  GAME_TITLE: 0,
  WAITING_FOR_PLAYERS: 1,
  PRE_GAME: 2,
  PLAYING_GAME: 3,
};

export interface IquizData{
    question: string;
    propositions: string[];
    answer: string;
    anecdote: string;
}

export function shuffleArray(array:any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}