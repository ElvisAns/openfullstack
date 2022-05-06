import { useState } from 'react'

const Statistic_Line = ({text,count}) =>{

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
const Buttons

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Head />
    </div>
  )
}

export default App