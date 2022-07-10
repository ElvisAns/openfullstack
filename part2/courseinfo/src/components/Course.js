import global from "../styles/global"

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
    const list = parts.map(el=>el.exercises)
    const total = list.reduce((prev,next)=>prev+next)
    return (
        <p style={global.total}>total of {total} exercises</p>
    )
}

const Course=({course})=>{
    return (
        <div>{
            course.map(val=>{
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

export default Course