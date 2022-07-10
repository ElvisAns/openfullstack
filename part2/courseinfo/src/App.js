
const Header = (props)=>{
    return (<h1>{props.course}</h1>)
}

const Content = ({parts})=>{
    return (
        <div>
            {parts.map((val,i) =><p key={i}>{val.name} {val.exercises}</p>)}
        </div>
    )
}

const Total= ({parts}) => {
    console.log(parts);
    const list = parts.map(el=>el.exercises)
    const total = list.reduce((prev,next)=>prev+next)
    return (
        <p>Number of exercises {total}</p>
    )
}

const Course=({course})=>{
    return (
        <div>{
            course.map(val=>{
                console.log(val.parts)
                return(
                    <div key={val.id}>
                        <Header course={val.name} />
                        <Content parts={val.parts} />
                        <Total parts={val.parts}/>
                    </div>
                )
            })
            }
        </div>
    )
}

const App = () => {

    const course = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

  return (
    <Course course={course} />
  )
}

export default App