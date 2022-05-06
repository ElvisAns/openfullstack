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
        <p>{text} : {count}</p>
    </div>
  )
}

const Head=()=><div><h1>Give feedback</h1></div>
const Buttons=({callback,text})=><button onClick={callback}>{text}</button>
const StatisticsOveral= ({data}) =>{
  const {good,neutral,bad}=data
  let all = good+neutral+bad
  let average = all/3
  average = average.toFixed(1)
  let positive = (all===0?0:((good/all)*100))
  positive = positive.toFixed(1)

  if(all){
  return(
    <div className='tblcontainer'>
    <table>
      <tbody>
        <tr>
          <th>All</th>
          <td>{all}</td>
        </tr>
        <tr>
          <th>Average</th>
          <td>{average}</td>
        </tr>
        <tr>
          <th>Positive</th>
          <td>{positive}%</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
  }
  else{
    return(
      <div>
        No feedback yet provided
      </div>
    )
  }
}

const Quote = ({text})=><p className='quote'><blockquote>{text}</blockquote></p>
const StatTitle = (prop)=><div><h1>{prop.text}</h1></div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setToGood] = useState(0)
  const [neutral, setToNeutral] = useState(0)
  const [bad, setToBad] = useState(0)

  const setGood = () => {
    setToGood(good+1)
  }

  function setBad(){
    setToBad(bad+1)
  }

  function setNeutral(){
    setToNeutral(neutral+1)
  }



  return (
    <div>
      <Head />
      <Buttons callback={setGood} text="Good" />
      <Buttons callback={setNeutral} text="Neutral" />
      <Buttons callback={setBad} text="Bad" />

      <StatTitle text="Statistics"/>
      <Statistics text="Good" count={good} />
      <Statistics text="Neutral" count={neutral} />
      <Statistics text="Bad" count={bad} />
      <StatisticsOveral data={{good:good,neutral:neutral,bad:bad}} />
      
      <StatTitle text="Anecdotes"/>
      <Quote text="Hello" />

    </div>
  )
}

export default App