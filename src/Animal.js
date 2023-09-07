import {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

import FlipCard from "./FlipCard";
import { flip, cleanUp } from './gameSlice'

const Animal = ({animal}) => {
    const dispatch = useDispatch();
    const flipped = useSelector(state => state.game.flipped);
    const needsCleanUp = useSelector(state => state.game.needCleanUp);

    const isFlipped = useMemo(() => {
        return flipped.some((flipped) => flipped === animal);
    }, [flipped])

    const handleFlip = useCallback(() => {
        dispatch(flip(animal))
    }, [])

    useEffect(() => {
        if(needsCleanUp.includes(animal)) {
            setTimeout(() => {
                dispatch(cleanUp())
            }, 500)
        }
    }, [needsCleanUp])

    return <FlipCard isFlipped={isFlipped}>
        <div className="front" onClick={handleFlip}>
            <img src={`${process.env.PUBLIC_URL}/images/IB.png`} alt="front-card"/>
        </div>
        <div className="back">
            <img src={`${process.env.PUBLIC_URL}/images/${animal.slice(0, 2)}.png`} alt={animal}/>
        </div>
    </FlipCard>
}

export default Animal;