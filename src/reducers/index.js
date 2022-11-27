import { MOVE_OBJECTS, SHOOT, START_GAME } from '../actions';
import moveObjects from './moveObjects';
import shoot from './shoot';
import startGame from './startGame';

const initialGameState = {
    started: false,
    kills: 0,
    lives: 3,
    flyingObjects: [],
    lastObjectCreatedAt: new Date(),
    cannonBalls: [],
};

const initialState = {
    angle: 45,
    gameState: initialGameState,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case MOVE_OBJECTS:
            return moveObjects(state, action);
        case START_GAME:
            return startGame(state, initialGameState);
        case SHOOT:
            return shoot(state, action);
        default:
            return state;
    }
}

export default reducer;