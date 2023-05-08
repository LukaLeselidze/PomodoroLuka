import React from 'react'

function LongBreakBar({ progress }) {


    return (
        <>
            <div className='bar_main'>
                <div className='bar_container'>
                    <div className='bar' style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", height: "1px", marginTop: "10px", }}>
                        <div style={{ borderRadius: '100px', backgroundColor: "white", height: "3px", width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LongBreakBar