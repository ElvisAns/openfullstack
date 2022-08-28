import global from "../styles/global"
import { useState } from "react"

const Header = (props) => {
    return (<h1>{props.course}</h1>)
}

const Form = (props) => {
    return (
        <input type="text"></input>
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

    const addCourses = (event) => {
        const prev = { ...course }
        updateCourses(prev)
    }
    return (
        <div style={global.body}>
            <Form onsubmit={addCourses} />{
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