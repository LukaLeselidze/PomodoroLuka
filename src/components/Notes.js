import React, { useContext, useEffect, useState, useRef } from 'react'
import PomoLogo from '../img/icon-white.png';
import Remove from '../img/remove-black.png';
import Clock from '../img/clock-black.png';
import Dots from '../img/threedots.png';
import BlackDots from '../img/vertical-dots.png'
import Circle from '../img/circle.png'
import Check from '../img/checkmark.png'
import Delete from '../img/delete-black.png'
import '../components/Notes.css'
import BreakPage from './BreakPage';
import { PomoContext } from './Contexts/PomoContext';
import LLongBreak from './LLongBreak';
import Sound from '../components/sounds/alarm-clock.mp3'
import Bar from './Bar';
import AddTask from './AddTask';
import { useNavigate } from 'react-router-dom';


function Notes() {
    const { editing, setIsEditing, tasks, setTasks, setInput1, setInput2, setInput3, setEditingTaskId, Break, setBreak, isActiveBreak, setisActiveBreak, setLongBreak, LongBreak, isActiveLongBreak, setisActiveLongBreak, addTaskIsOpen, setAddTaskIsOpen } = useContext(PomoContext);

    const navigate = useNavigate()
    const defaultTime = 25 * 60;
    const [time, setTime] = useState(parseInt(localStorage.getItem('time')) || defaultTime);
    const [customTime, setCustomTime] = useState(25);
    const [customBreak, setCustomBreak] = useState(5);
    const [customLongBreak, setCustomLongBreak] = useState(15);
    const [isActive, setisActive] = useState(false);
    const [settingsOpened, setSettingsOpened] = useState(false);
    const popupRef = useRef(null);
    const [switchBreak, setSwitchBreak] = useState(false);
    const [switchPomodoro, setSwitchPomodoro] = useState(true);
    const [switchLongBreak, setSwitchLongBreak] = useState(false)
    const [bgColor, setBgColor] = useState("");
    const [modifyOpen, setModifyOpen] = useState(false);

    const formattedTime = `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;


    useEffect(() => {
        localStorage.setItem("time", time);
        localStorage.setItem("isActive", isActive);
    }, [time, isActive,]);

    useEffect(() => {

        if (localStorage.getItem("time")) {
            setTime(parseInt(localStorage.getItem("time")));
            setisActive(localStorage.getItem("isActive") === "true");
        }
    }, []);

    useEffect(() => {
        let interValid;
        if (isActive && time > 0) {
            interValid = setInterval(() => {
                setTime((prevTime) => prevTime - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setisActive(false)
        }
        return () => clearInterval(interValid);

    }, [isActive, time]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSettingsOpened(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef]);

    useEffect(() => {
        if (time === 0) {
            setSwitchPomodoro(false)
            setSwitchBreak(true)
            const audio = new Audio(Sound)
            audio.play()
        }
    }, [time, Break, LongBreak, isActive])

    const progress = ((customTime * 60 - time) / (customTime * 60)) * 100;
    const progressBreak = ((customBreak * 60 - Break) / (customBreak * 60)) * 100;
    const progressLongBreak = ((customLongBreak * 60 - LongBreak) / (customLongBreak * 60)) * 100;

    function handleTimerToggle() {
        setisActive((prevIsActive) => !prevIsActive)
    }

    function handleTimeChanger(e) {
        setCustomTime(e.target.value);
        setTime(parseInt(e.target.value) * 60)
    }

    function handleBreakChanger(e) {
        setCustomBreak(e.target.value);
        setBreak(parseInt(e.target.value) * 60)
    }

    function handleLongBreakChanger(e) {
        setCustomLongBreak(e.target.value);
        setLongBreak(parseInt(e.target.value) * 60);
    }

    function handleSettings() {
        setSettingsOpened((prevIsActive) => !prevIsActive);
        setAddTaskIsOpen(false);
    }

    function closeHandler() {
        setSettingsOpened(false)
    }

    function handleBreakSwitch(color) {
        if (isActive && time > 0) {
            setTime(customTime * 60)
        }
        setSwitchBreak(true)
        setSwitchPomodoro(false)
        setSwitchLongBreak(false)
        setBgColor(color)
        document.body.className = 'bg-color-break'
        if (isActive || isActiveLongBreak) {
            setisActive(false)
            setisActiveLongBreak(false)
        }
    }

    function handlePomodoroSwitch() {
        if (isActiveBreak && Break > 0) {
            setBreak(customBreak * 60)
        } else if (isActiveLongBreak && LongBreak > 0) {
            setLongBreak(customLongBreak * 60)
        }
        setSwitchPomodoro(true)
        setSwitchBreak(false)
        setSwitchLongBreak(false)
        document.body.className = 'bg-color-pomodoro'
        if (isActiveBreak || isActiveLongBreak) {
            setisActiveBreak(false)
            setisActiveLongBreak(false)
        }
    }

    function handleLongBreakSwitch() {
        setSwitchLongBreak(true)
        setSwitchBreak(false)
        setSwitchPomodoro(false)
        document.body.className = 'bg-color-long-break'
        if (isActiveBreak || isActive) {
            setisActiveBreak(false)
            setisActive(false)
        }
    }

    function handleAddTask() {
        setAddTaskIsOpen((prevIsActive) => !prevIsActive);
    }

    const handleEdit = (taskId) => {
        setEditingTaskId(taskId);

        const taskToEdit = tasks.find((task) => task.id === taskId);

        setInput1(taskToEdit.input1);
        setInput2(taskToEdit.input2);
        setInput3(taskToEdit.input3);
        setIsEditing(true);
        setAddTaskIsOpen(true)
    };

    const handleCheck = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, checked: !task.checked };
            }
            return task;
        });

        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    function removeAllTasks() {
        setTasks([]);
        localStorage.removeItem('tasks');
        setModifyOpen(false);
    }

    function removeFinishedTasks() {
        const removedFinished = tasks.filter((task) => !task.checked)
        setTasks(removedFinished);
        localStorage.setItem('tasks', JSON.stringify(removedFinished));
        setModifyOpen(false);
    }

    function handleModifyTasks() {
        setModifyOpen((prevIsActive) => !prevIsActive)
    }

    function handleActive(e, taskId) {
        if (e.target.className === 'circle_div_clicked' || e.target.className === 'circle_div') {
            return;
        }
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, active: !task.active };
            }
            return { ...task, active: false };
        });

        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }

    function navigateLogin() {
        navigate('/');

    }

    return (
        <div>
            <div className='big_wrapper'>
                <div className='sec_wrapper'>
                    <div className='header_container'>
                        <div className='header'>
                            <img src={PomoLogo}></img>
                            <div className='buttons'>
                                <button>Report</button>
                                <button onClick={handleSettings}>Setting</button>
                                <button onClick={navigateLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                    {switchPomodoro && <div className='bar_main'> <div className='bar_container'>
                        <div className='bar' style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", height: "1px", marginTop: "10px", }}>
                            <div style={{ borderRadius: '100px', backgroundColor: "white", height: "3px", width: `${progress}%` }}></div>
                        </div>
                    </div> </div>}
                    {switchBreak && <Bar progress={progressBreak} />}
                    {switchLongBreak && <div className='bar_main'> <div className='bar_container'>
                        <div className='bar' style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", height: "1px", marginTop: "10px", }}>
                            <div style={{ borderRadius: '100px', backgroundColor: "white", height: "3px", width: `${progressLongBreak}%` }}></div>
                        </div>
                    </div> </div>}
                    <div className='content_main'>
                        <div className='content_container'>
                            <div className='content'>
                                <div className='content_buttons'>
                                    <button className={`${switchPomodoro ? 'pomodoro_active' : 'not_active'}`} onClick={handlePomodoroSwitch}>Pomodoro</button>
                                    <button className={`${switchBreak ? 'pomodoro_active' : 'not_active'}`} onClick={handleBreakSwitch}>Short Break</button>
                                    <button className={`${switchLongBreak ? 'pomodoro_active' : 'not_active'}`} onClick={handleLongBreakSwitch}>Long Break</button>
                                </div>
                                {switchBreak && <BreakPage />}
                                {switchPomodoro && <><div className='main_time'>
                                    <p className='formatted_time'> {formattedTime}</p>
                                </div>
                                    <div className='start_container'>
                                        <button onClick={handleTimerToggle}> {isActive ? 'Stop' : 'Start'} </button>
                                    </div></>}
                                {switchLongBreak && <LLongBreak />}
                            </div>
                        </div>
                    </div>
                    {settingsOpened && <div className='settings_overlay'>
                        <div ref={popupRef} className='settings_container'>
                            <div className='settings_top_container'>
                                <div className='settings_top'>
                                    <h1>Setting</h1>
                                    <img onClick={closeHandler} src={Remove}></img>
                                </div>
                                <div className='timer_container'>
                                    <div className='timer'>
                                        <img src={Clock}></img>
                                        <p>Timer</p>
                                    </div>
                                    <h1>Time (minutes)</h1>
                                </div>
                            </div>
                            <div className='setting_inputs_container'>
                                <div className='setting_inputs'>
                                    <label>Pomodoro</label>
                                    <input className='setting_input' value={customTime} onChange={handleTimeChanger} type='number' ></input>
                                </div>
                                <div className='setting_inputs'>
                                    <label>Short Break</label>
                                    <input className='setting_input' value={customBreak} onChange={handleBreakChanger} type='number' ></input>
                                </div>
                                <div className='setting_inputs'>
                                    <label>Long Break</label>
                                    <input className='setting_input' value={customLongBreak} onChange={handleLongBreakChanger} type='number' ></input>
                                </div>
                            </div>

                        </div>
                    </div>
                    }
                    <div className='notes'>
                        <div className='notes_container'>
                            {modifyOpen && <div className='tasks_more_window'>
                                <div onClick={removeAllTasks} className='finished_tasks'>
                                    <img src={Delete} alt='Delete finished tasks'></img>
                                    <p >Clear All Tasks</p>
                                </div>
                                <div onClick={removeFinishedTasks} className='finished_tasks'>
                                    <img src={Delete} alt='Delete finished tasks'></img>
                                    <p >Clear Finished Tasks</p>
                                </div>
                            </div>}
                            <div className='notes_first'>
                                <span>Tasks</span>
                                <div onClick={handleModifyTasks}>
                                    <button className='notes_button'> <img className='dots' src={Dots} /> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='note_wrapper'>
                        <div className='notes_list_container'>
                            {tasks && tasks.map((task) => (
                                <div className='notes_list' key={task.id}>
                                    <div onClick={(e) => handleActive(e, task.id)} className={!task.active ? 'note_list_flex' : 'note_list_active'}>
                                        <div className='first_div'>
                                            <div onClick={() => handleCheck(task.id)} className={task.checked ? 'circle_div_clicked' : 'circle_div'}>
                                                <img src={Check}></img>
                                            </div>
                                            <div> <h1>{task.input1}</h1></div>
                                            <div className='additional_note'> <h1>{task.input2}</h1> </div>
                                        </div>
                                        <div className='right_part'>
                                            <div className='span_div'> <span className='first_span' > 0 <span className='second_span'> / {task.input3} </span> </span> </div>
                                            <div onClick={() => handleEdit(task.id)} className='note_dots'> <img src={BlackDots}></img></div>
                                        </div>
                                    </div>
                                </div>
                            ))}</div> </div>
                    <div onClick={handleAddTask} className='add_note'>
                        <div><img src={Circle}></img></div>
                        <div >Add Task</div>
                    </div>
                    {addTaskIsOpen && <AddTask editing={editing} />}

                </div>
            </div>
        </div >

    )
}

export default Notes