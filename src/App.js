import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './App.css';
import Animal from "./Animal";
import {setDifficulty, initialFlip, hideAnimals, reset, reactivate} from './gameSlice'


const MySwal = withReactContent(Swal)


function App() {
    const dispatch = useDispatch();
    const [initiating, setInitiating] = useState(false)
    const farm = useSelector((state) => state.game.farm)
    const finished = useSelector((state) => state.game.finished)
    const trys = useSelector((state) => state.game.trys)
    const difficulty = useSelector((state) => state.game.difficulty)
    const hellUnleashed = useSelector((state) => state.game.hellUnleashed)


    const handleNormalOnClick = useCallback(() => {
        dispatch(setDifficulty('NORMAL'))
        setInitiating(true);
    });

    const handleNightmareOnClick = useCallback(() => {
        MySwal.fire({
            icon: 'warning',
            title: 'Ojete moreno',
            text: 'Espero que aprendas de los errores, porque cada vez que falles tendras esos animales que pensabas que tenias asegurados volveran a esconderse',
            confirmButtonText: 'Al lio',
        }).then(() => {
            dispatch(setDifficulty('NIGHTMARE'))
            setInitiating(true);
        })
    });

    const resetGame = useCallback((difficulty) => {
        setTimeout(() => {
            dispatch(hideAnimals())
        }, 600)
        setTimeout(() => {
            dispatch(setDifficulty(difficulty))
            setInitiating(true);
        }, 1000);
    }, [])

    useEffect(() => {
        if (initiating) {
            setTimeout(() => {
                dispatch(initialFlip())
            }, 250)

            setTimeout(() => {
                dispatch(hideAnimals());
                dispatch(reactivate());
            }, 6250)
            setInitiating(false)
        }
    }, [initiating])

    useEffect(() => {
        if (hellUnleashed) {
            resetGame('HELL');
        }
    }, [hellUnleashed])

    useEffect(() => {
        if (trys === 10) {
            MySwal.fire({
                title: 'Vaya',
                text: '¿Parece qué no le prestaste mucha atención a la solución final del principio, no?',
                confirmButtonText: 'Pues tienes razón',
            })
        }
        if (trys === 25) {
            MySwal.fire({
                icon: 'info',
                title: 'Aviso',
                text: 'Si quieres puedes volver a empezar, la solución final esta ahi mismo a la vista al inicio.',
                confirmButtonText: 'Empecemos de nuevo',
                cancelButtonText: 'Seguire intentandolo',
                showCancelButton: true,
            }).then((response) => {
                if (response.isConfirmed) {
                    resetGame(difficulty)
                }
            })
        }
    }, [trys, difficulty])

    useEffect(() => {
        if (finished) {
            let text = '';
            if (difficulty === "NORMAL") {
                text = 'Lo has conseguido. Ahora deberias probar algo que sea un reto de verdad'
            }
            if (difficulty === 'NIGHTMARE') {
                text = 'La paciencia es un don, la cabezoneria una maldición. Todavia hay un nivel más complicado esperando'
            }
            if (difficulty === 'HELL') {
                text = '¿Hiciste pantallazo al principio? Felicidades entendiste y aprovechaste el tema. Si lo has hecho de memoria eres algo de otro mundo'
            }

            MySwal.fire({
                icon: difficulty === 'HELL' ? 'success' : 'info',
                title: 'Felicidades',
                text: text,
                confirmButtonText: 'Al lio',
                showConfirmButton: difficulty !== 'HELL',

            }).then((result) => {
                dispatch(reset());
            })
        }
    }, [finished, difficulty])

    const handleHellOnClick = useCallback(() => {
        MySwal.fire({
            icon: 'warning',
            iconColor: 'tomato',
            title: 'Ojete moreno',
            text: 'Atento a los animales porque cuando se falle se volveran a mezclar y tendras que empezar de nuevo',
            confirmButtonText: 'Al lio'
        }).then(() => {
            dispatch(setDifficulty('HELL'))
            setInitiating(true);
        })
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                Farm Away
            </header>
            {
                farm.length ?
                    <div className="Farm">
                        {farm.map(animal => <Animal animal={animal} key={animal}/>)}
                    </div>
                    :
                    <div className="textContainer">
                        <div className="text">
                            <p>Oh, no... Los animales se han escondido en la granja</p>
                            <p>Ve rescatandolos por parejas para que se tranquilicen y puedas organizarlos</p>
                            <h3 className="diff">Dificultad</h3>
                            <button className="button" onClick={handleNormalOnClick}>Normal</button>
                            <button className="button" onClick={handleNightmareOnClick}>Pesadilla</button>
                            <button className="button" onClick={handleHellOnClick}>Infierno</button>
                        </div>
                    </div>
            }
        </div>
    );
}

export default App;
