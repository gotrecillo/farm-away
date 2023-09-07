import {createSlice} from '@reduxjs/toolkit'
import generateFarm from "./utils/generateFarm";
import shuffle from "./utils/shuffle";

const isSameAnimal = (a, b) => {
    return a.slice(0, 2) === b.slice(0, 2)
}

const herdIncludesAnimal = (herd, animal) => {
    return herd.includes(animal);
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        farm: [],
        trys: 0,
        difficulty: 'NORMAL',
        reactive: false,
        hellUnleashed: false,
        flipped: [],
        previousCard: '',
        needCleanUp: [],
    },
    reducers: {
        flip: (state, action) => {
            if (state.reactive) {
                const flipped = [...state.flipped, action.payload];
                state.flipped = flipped;
                if (!state.previousCard) {
                    state.previousCard = action.payload;
                } else {
                    if (!isSameAnimal(action.payload, state.previousCard)) {
                        state.trys += 1;
                        state.reactive = false;
                        if (state.difficulty === 'NORMAL') {
                            state.needCleanUp = [state.previousCard, action.payload]
                        }
                        if (state.difficulty === 'NIGHTMARE') {
                            state.needCleanUp = state.flipped
                        }
                        if (state.difficulty === 'HELL') {
                            state.hellUnleashed = true;
                        }
                    } else {
                        if (flipped.length === state.farm.length) {
                            state.finished = true;
                        }
                    }
                    state.previousCard = ''
                }
            }
        },
        cleanUp: (state) => {
            state.flipped = state.flipped.filter(xs => !herdIncludesAnimal(state.needCleanUp, xs))
            state.needCleanUp = [];
            state.reactive = true;
        },
        setDifficulty: (state, action) => {
            state.difficulty = action.payload;
            const colors = ['W', 'W', 'W', 'W', 'W', 'W'];
            const animals = ['C', 'E', 'F', 'J', 'O', 'T'];
            state.farm = shuffle(generateFarm(colors, animals));
            state.reactive = false;
            state.hellUnleashed = false;
            state.trys = 0;
        },
        initialFlip: (state) => {
            state.flipped = state.farm;
        },
        hideAnimals: (state) => {
            state.flipped = [];
            state.reactive = false;

        },
        reactivate: (state) => {
            state.reactive = true;
        },
        reset: (state) => {
            state.farm = [];
            state.finished = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const {setDifficulty, flip, initialFlip, hideAnimals, cleanUp, reactivate, reset} = gameSlice.actions

export default gameSlice.reducer