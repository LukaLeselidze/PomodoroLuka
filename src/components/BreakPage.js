import React, { useContext, useEffect } from 'react'
import { PomoContext } from './Contexts/PomoContext';

import { useState } from 'react'

function Break() {

    const { Break, setBreak, isActiveBreak, setisActiveBreak, formattedBreak, defaultBreak } = useContext(PomoContext);

    useEffect(() => {
        localStorage.setItem('break', Break)
        localStorage.setItem('isActiveBreak', isActiveBreak)
    }, [Break, isActiveBreak])

    useEffect(() => {
        if (localStorage.getItem('break')) {
            setBreak(parseInt(localStorage.getItem('break')));
            setisActiveBreak(localStorage.getItem('isActiveBreak') === 'true')
        }
    }, [])

    useEffect(() => {
        let interValid;
        if (isActiveBreak && Break > 0) {
            interValid = setInterval(() => {
                setBreak((prevTime) => prevTime - 1)
            }, 1000)
        } else if (isActiveBreak && Break === 0) {
            setisActiveBreak(false)
        }
        return () => clearInterval(interValid);

    }, [isActiveBreak, Break]);

    function handleBreakToggle() {
        setisActiveBreak((prevIsActive) => !prevIsActive)
    }

    return (
        <div>
            <div className='main_time'>
                <p className='formatted_time'> {formattedBreak}</p>
            </div>
            <div className='start_container'>
                <button className='break_page_button' onClick={handleBreakToggle}> {isActiveBreak ? 'Stop' : 'Start'} </button>
            </div>
        </div>
    )
}

export default Break