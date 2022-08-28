import global from "../styles/global"
import { useState } from "react"

const Header = (props) => {
    return (<h1>{props.course}</h1>)
}

const Form = (props) => {
    return (
        <form onSubmit={props.addCourses}  style={props.style}>
            <label style={props.style.label}>Course Name</label>
            <input style={props.style.input} type="text" placeholder="course name" value={props.coursename} onChange={props.setCourseName} />
            <label style={props.style.label}>Program Name</label>
            <input style={props.style.input} type="text" placeholder="program name"  value={props.courseprogram} onChange={props.setCourseProgramName} />
            <label style={props.style.label}>credits</label>
            <input style={props.style.input} type="number" placeholder="credits"  value={props.coursecredit} onChange={props.setCoursCredit} />

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
    const [coursename,updateCourseName]=useState("Elvis Ansima")
    const [courseprogram,updateCourseProgram]=useState("")
    const [coursecredit,updateCourseCredit]=useState("")

    const addCourses = (event) => {
        event.preventDefault()
        console.log(event.target)
        const prev = {...course}
        console.log(prev)
        updateCourses(prev)
    }

    const setCoursCredit = event =>{
        console.log(event.target.value)
        updateCourseCredit(event.target.value)
    }

    const setCourseProgramName = event=>{

    }

    const setCourseName = event=>{

    }

    return (
        <div style={global.body}>
            <Form setCoursCredit={setCoursCredit} setCourseProgramName={setCourseProgramName} setCourseName={setCourseName} courseprogram={courseprogram} coursename={coursename}  addCourses={addCourses} coursecredit={coursecredit} style={global.form}/>{
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