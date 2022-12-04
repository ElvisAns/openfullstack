import global from "../styles/global"
import { useState } from "react"

const Header = (props) => {
    return (<h1>{props.course}</h1>)
}

const Form = (props) => {
    return (
        <form onSubmit={props.addCourses} style={props.style}>
            <label style={props.style.label}>Program Name</label>
            <input style={props.style.input} type="text" placeholder="program name" value={props.coursename} onChange={props.setCourseName} />
            <label style={props.style.label}>Part Name</label>
            <input style={props.style.input} type="text" placeholder="part name" value={props.courseprogram} onChange={props.setCourseProgramName} />
            <label style={props.style.label}>Exercises</label>
            <input style={props.style.input} type="number" placeholder="exercices" value={props.coursecredit} onChange={props.setCoursCredit} />

            <button style={props.style.button} type="submit">Record</button>
        </form>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((val, i) => <p key={i}>{val.name} <b style={global.number}>{val.exercises}</b></p>)}
        </div>
    )
}

const Total = ({ parts }) => {
    const list = parts.map(el => el.exercises)
    const total = list.reduce((prev, next) => prev + next)
    return (
        <p style={global.total}>total of <i style={global.number}>{total}</i> exercises</p>
    )
}

const Course = (props) => {
    const [course, updateCourses] = useState(props.course)
    const [coursename, updateCourseName] = useState("Redux")
    const [courseprogram, updateCourseProgram] = useState("Half Stack application development")
    const [coursecredit, updateCourseCredit] = useState("10")

    const addCourses = (event) => {
        event.preventDefault()
        const prev = [...course]
        /*
        * Handle search and update or push to the object depending on whever the course is new or not
        */
        const search = prev.find(program => program.name === coursename)
        if (search) {
            const pos = prev.indexOf(search);
            prev[pos].parts.push({
                name: coursename,
                exercises: coursecredit,
                id: prev[pos].parts.length + 1
            })
        }
        else {
            prev.push(
                {
                    name: coursename,
                    id: prev.length + 1,
                    parts: [
                        {
                            name: coursename,
                            exercises: coursecredit,
                            id: 0
                        }
                    ]
                }
            )
        }

        updateCourses(prev)
    }

    const setCoursCredit = event => {
        updateCourseCredit(event.target.value)
    }

    const setCourseProgramName = event => {
        updateCourseProgram(event.target.value)
    }

    const setCourseName = event => {
        updateCourseName(event.target.value)
    }

    return (
        <div style={global.body}>
            <Form setCoursCredit={setCoursCredit} setCourseProgramName={setCourseProgramName} setCourseName={setCourseName} courseprogram={courseprogram} coursename={coursename} addCourses={addCourses} coursecredit={coursecredit} style={global.form} />
            {
                course.map(val => {
                    return (
                        <div key={val.id}>
                            <Header course={val.name} />
                            <Content parts={val.parts} />
                            <Total parts={val.parts} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Course