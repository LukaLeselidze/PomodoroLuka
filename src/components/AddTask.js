import React, { useState, useContext, useEffect } from 'react';
import { PomoContext } from './Contexts/PomoContext';
import CaretUp from '../img/caret-up.png'
import CaretDown from '../img/caret-down.png'

function AddTask() {
    const { editing, setIsEditing, tasks, setTasks, input1, setInput1, input2, setInput2, input3, setInput3, editingTaskId, setEditingTaskId, setAddTaskIsOpen } = useContext(PomoContext);
    const [showNote, setShowNote] = useState(false);


    function noteHandler() {
        setShowNote((prevIsActive) => !prevIsActive)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input1.trim() === '' || input2.trim() === '' || isNaN(input3) || input3 === 0) {
            return;
        }
        const taskId = Date.now();
        const newTask = {
            id: taskId,
            input1,
            input2,
            input3,
            checked: false,
            active: false
        };
        setTasks([...tasks, newTask]);
        setInput1('');
        setInput2('');
        setInput3(0);
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    };

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const handleDelete = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        setIsEditing(false);
        setInput1('');
        setInput2('');
        setInput3(0);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedTasks = tasks.map((task) => {
            if (task.id === editingTaskId) {
                return {
                    ...task,
                    input1,
                    input2,
                    input3,

                };
            } else {
                return task;
            }
        });

        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setInput1('');
        setInput2('');
        setInput3(0);
        setEditingTaskId(null);
        setIsEditing(false);
    };

    function handleAddTaskButton() {
        console.log('button clicked')
        setAddTaskIsOpen((prevIsActive) => !prevIsActive);
    }

    function increase() {
        setInput3(input3 + 1)
    }

    function decrease() {
        if (input3 > 0) {
            setInput3(input3 - 1)
        } else {
            return
        }

    }

    return (
        <div>
            <div className='task_container'>
                <div className='task_box'>
                    <div className='task_top'>
                        <div className='input_text'>
                            <input value={input1} onChange={(e) => setInput1(e.target.value)} type='text' placeholder='What are you working on?'></input>
                        </div>
                    </div>
                    <div className='task_middle'>
                        <p>Est Pomodoros</p>
                        <div className='est_pomodoro'>
                            <input min='0' value={input3} onChange={(e) => setInput3(e.target.value)} type='number'></input>
                            <button onClick={increase} > <img src={CaretUp}></img> </button>
                            <button onClick={decrease}> <img src={CaretDown}></img> </button>
                        </div>
                        {showNote && <> <div className='more_note'> <input value={input2} onChange={(e) => setInput2(e.target.value)} type='text' placeholder='Some Note'></input> </div> </>}
                        <div>
                            <div className='add_note_container'>
                                <div> <button onClick={noteHandler}> {showNote ? 'Remove Note' : '+ Add Note'} </button> </div>
                                <div> <button> + Add Project</button> </div>
                            </div>
                        </div>
                    </div>
                    <div className='task_bottom'>
                        <div className='bottom'>
                            <button onClick={() => handleDelete(editingTaskId)} className={!editing ? 'hidden' : 'show'}> Delete</button>
                            <div className='main_button'>
                                <button onClick={handleAddTaskButton} className='cancel'> Cancel </button>
                                <button onClick={editing ? handleUpdate : handleSubmit} className='save'> {editing ? 'Update' : 'Save'} </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask