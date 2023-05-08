import React, { useContext, useEffect, useState } from 'react'
import { PomoContext } from './Contexts/PomoContext';


function LongBreak() {

    const { isActiveLongBreak, setisActiveLongBreak, formattedLongBreak, setLongBreak, LongBreak, defaultLongBreak, setBreak } = useContext(PomoContext);

    useEffect(() => {
        localStorage.setItem('longBreak', LongBreak)
        localStorage.setItem('isActiveLongBreak', isActiveLongBreak)
    }, [LongBreak, isActiveLongBreak])

    useEffect(() => {
        if (localStorage.getItem('longBreak')) {
            setLongBreak(parseInt(localStorage.getItem('longBreak')));
            setisActiveLongBreak(localStorage.getItem('isActiveLongBreak') === 'true')
        }
    }, [])

    useEffect(() => {
        let interValid;
        if (isActiveLongBreak && LongBreak > 0) {
            interValid = setInterval(() => {
                setLongBreak((prevTime) => prevTime - 1)
            }, 1000)
        } else if (isActiveLongBreak && LongBreak === 0) {
            setisActiveLongBreak(false)
        }
        return () => clearInterval(interValid);

    }, [isActiveLongBreak, LongBreak]);

    function handleLongBreakToggle() {
        setisActiveLongBreak((prevIsActive) => !prevIsActive)
    }


    return (
        <div>
            <div className='main_time'>
                <p className='formatted_time'> {formattedLongBreak}</p>
            </div>
            <div className='start_container'>
                <button className='long_break_page_button' onClick={handleLongBreakToggle}> {isActiveLongBreak ? 'Stop' : 'Start'} </button>

            </div>

        </div>
    )
}

export default LongBreak