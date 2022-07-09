
const Header = (props)=>{
    return (<h1>{props.course}</h1>)
}



const Content = ({parts})=>{
    return (
        <div>
            {parts.map((val,i) =><p key={i}>{val.name} {val.exercice}</p>)}
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

const Course=({course})=>{
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
}

const App = () => {

    const course = {
    name : 'Half Stack application development',
    parts : 
        [
            {
                name: 'Fundamentals of React',
                exercice : 10
            },
            {
                name: 'Using props to pass data',
                exercice : 7
            },
            {
                name: 'State of a component',
                exercice : 14
            },
            {
                name: 'Redux',
                exercice : 12
            }
        ]
    }

  return (
    <Course course={course} />
  )
}

export default App