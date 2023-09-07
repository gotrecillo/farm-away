import { useEffect, useState } from 'react';


const FlipCard = (props) => {
    const [isFlipped, setFlipped] = useState(props.isFlipped);

    useEffect(() => {
        if (props.isFlipped !== isFlipped) {
            setFlipped(props.isFlipped);
        }
    }, [props.isFlipped, isFlipped]);

    const getComponent = (key) => {
        if (props.children.length !== 2) {
            throw new Error(
                'Component FlipCard requires 2 children to function',
            );
        }
        return props.children[key];
    };

    const frontRotateY = `rotateY(${isFlipped ? 180 : 0}deg)`;
    const backRotateY = `rotateY(${isFlipped ? 0 : -180}deg)`;

    const styles= {
        back: {
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            height: '100%',
            left: '0',
            position: isFlipped ? 'relative' : 'absolute',
            top: '0',
            transform: backRotateY,
            transformStyle: 'preserve-3d',
            transition: `${0.6}s`,
            width: '100%',
        },
        container: {
            perspective: '1000px',
            zIndex: 'auto',
        },
        flipper: {
            height: '100%',
            position: 'relative',
            width: '100%',
        },
        front: {
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            height: '100%',
            left: '0',
            position: isFlipped ? 'absolute' : 'relative',
            top: '0',
            transform: frontRotateY,
            transformStyle: 'preserve-3d',
            transition: `${0.6}s`,
            width: '100%',
            zIndex: '2',
        },
    };

    return (
        <div
            className="card-flip"
            style={{ ...styles.container }}
        >
            <div className="react-card-flipper" style={styles.flipper}>
                <div className="react-card-front" style={styles.front}>
                    {getComponent(0)}
                </div>

                <div className="react-card-back" style={styles.back}>
                    {getComponent(1)}
                </div>
            </div>
        </div>
    );
};


export default FlipCard;