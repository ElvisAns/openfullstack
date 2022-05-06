import { useState } from 'react'

const Statistics = ({text,count}) =>{

  if(!count){
    return(
      <>
        
      </>
    )
  }
  return(
    <div>
        {text} : {count}
    </div>
  )
}

const Head=()=><div>Give feedback</div>
const Buttons=({callback,text})=><button onClick={callback}>{text}</button>
const StatisticsOveral= ({data}) =>{
  const {good,neutral,bad}=data
  return(
    <table>
      <tr>
        <th>All</th>
        <td>{good}</td>
      </tr>
      <tr>
        <th>Average</th>
        <td>{neutral}</td>
      </tr>
      <tr>
        <th>Positive</th>
        <td>{bad}</td>
      </tr>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Head />
      <Buttons callback={setGood} text="Good" />
      <Buttons callback={setNeutral} text="Neutral" />
      <Buttons callback={setBad} text="Bad" />

      <Statistics text="Good" count={good} />
      <Statistics text="Neutral" count={neutral} />
      <Statistics text="Bad" count={bad} />
      <StatisticsOveral data={{good:good,neutral:neutral,bad:bad}} />
    </div>
  )
}

export default App