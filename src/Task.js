 import { useState } from 'react';

const Task = () => {

  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Fed 5th at 2:30pm',
        reminder: true,
      },
      {
        id: 2,
        text: 'Meeting at School',
        day: 'Fed 6th at 1:30pm',
        reminder: true,
      }
    ]
  )

  return (
    <div>
      {tasks.map((task) => (<h3 key={task.id}>{task.text}</h3>))}
    </div>
  )
}


export default Task
