import global from "../styles/global"

const Header = (props)=>{
    return (<h1>{props.course}</h1>)
}

const Content = ({parts})=>{
    return (
        <div>
            {parts.map((val,i) =><p key={i}>{val.name} <b style={global.number}>{val.exercises}</b></p>)}
        </div>
    )
}

const Total= ({parts}) => {
    const list = parts.map(el=>el.exercises)
    const total = list.reduce((prev,next)=>prev+next)
    return (
        <p style={global.total}>total of <i style={global.number}>{total}</i> exercises</p>
    )
}

const Course=({course})=>{
    return (
        <div style={global.body}>{
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