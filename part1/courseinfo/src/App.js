import {useState} from 'react'

const Header = (props)=>{
    return (<h1>{props.course}</h1>)
}

const Part1 = (props)=>{
    return(
    <>
    <p>{props.part} {props.exercice}</p>
    </>)
}
const Part2 = (props)=>{
    return(<p>{props.part} {props.exercice} </p>)
}
const Part3 = (props)=>{
    return(<p>{props.part} {props.exercice}</p>)
}

const Content = (props)=>{
    return (
        <div>
            <Part1 exercice={props.parts[0].exercice} part={props.parts[0].name} />
            <Part2 exercice={props.parts[1].exercice} part={props.parts[1].name} />
            <Part3 exercice={props.parts[2].exercice} part={props.parts[2].name} />
        </div>
    )
}
const Total= (props) => {
    console.log(props)
    let total = props.parts[2].exercice + props.parts[1].exercice + props.parts[0].exercice
    return (
        <p>Number of exercises {total}</p>
    )
}
const Button = (props)=>{
    return (
        <p><button onClick={props.callback}>{props.text}</button></p>
    )
}
const App = () => {
    const [exec,update] = useState(0);

    const course = {
    name : 'Half Stack application development',
    parts : 
        [
            {
                name: 'Fundamentals of React',
                exercice : exec
            },
            {
                name: 'Using props to pass data',
                exercice : 7
            },
            {
                name: 'State of a component',
                exercice : 14
            }
        ]
    }

    const handleClick = ()=>{
        update(0);
    }
    const handleClickInc = ()=>{
        update(exec+1);
    }

  return (
    <div>
      <Header course={course.name} />
      <Button callback={handleClick} text="Reset"/>
      <Button callback={handleClickInc} text="Increase"/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App