import React from 'react';
import PropTypes from 'prop-types';
import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CurrentScore from './CurrentScore'
import FlyingObject from './FlyingObject';
import StartGame from './StartGame';
import Title from './Title';
import CannonBall from './CannonBall';
import Heart from './Heart';

const Canvas = (props) => {
    const gameHeight = 1200;
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

    const lives = [];
    for (let i = 0; i < props.gameState.lives; i++) {
        const heartPosition = {
            x: -180 - (i * 70),
            y: 35
        };
        lives.push(<Heart key={i} position={heartPosition}/>);
    }

    return (
        <svg
            id="aliens-go-home-canvas"
            preserveAspectRatio="xMaxYMax"
            onMouseMove={props.trackMouse}
            onClick={props.shoot}
            viewBox={viewBox}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" />
                </filter>
            </defs>
            <Sky />
            <Ground />

            {props.gameState.cannonBalls.map(cannonBall => (
                <CannonBall
                    key={cannonBall.id}
                    position={cannonBall.position}
                />
            ))}

            <CannonPipe rotation={props.angle} />
            <CannonBase />
            <CurrentScore score={props.gameState.kills} />
            {/*<Heart position={{x: -300, y: 35}} />*/}

            { ! props.gameState.started &&
                <g>
                    <StartGame onClick={() => props.startGame()} />
                    <Title />
                </g>
            }

            {/*{ props.gameState.started &&*/}
            {/*    <g>*/}
            {/*        <FlyingObject position={{x: -150, y: -300}}/>*/}
            {/*        <FlyingObject position={{x: 150, y: -300}}/>*/}
            {/*    </g>*/}
            {/*}*/}

            {props.gameState.flyingObjects.map(flyingObject => (
                <FlyingObject
                    key={flyingObject.id}
                    position={flyingObject.position}
                />
            ))}

            {lives}

        </svg>
    );
};

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }).isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    trackMouse: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    shoot: PropTypes.func.isRequired,
};

export default Canvas;