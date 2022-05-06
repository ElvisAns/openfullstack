import { useState } from 'react'

const Statistics = ({text,count}) =>{
  return(
    <tr>
        <td>{text}</td><td>{count}</td>
    </tr>
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

const Quote = ({text})=><blockquote>{text}</blockquote>
const BestQuote = ({quotes,votes})=>{
  let max = []
  max[0]=0 //votes
  max[1] = 0 //index

  votes.forEach((votes,index)=>{
    if(max[0]<votes){
      max[0] = votes
      max[1] = index
     }
    }
  )

  return(
    <div>
      <blockquote>{quotes[max[1]]}</blockquote>
      <p>has {max[0]===0?"no":max[0]} votes</p>
    </div>
  )
}
const CountVote =({votes,sel})=>{
  let text = votes[sel]??"no"
  return(
    <p>has {text} vote(s)</p>
  )
}
const StatTitle = (prop)=><div><h1>{prop.text}</h1></div>



const App = () => {
  // save clicks of each button to its own state
  const [good, setToGood] = useState(0)
  const [neutral, setToNeutral] = useState(0)
  const [bad, setToBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const quotes =[
   "The key to performance is elegance, not battalions of special cases.",
   "Hiring people to write code to sell is not the same as hiring people to design and build durable, usable, dependable software.",
   "You can't have great software without a great team, and most software teams behave like dysfunctional families.",
   "... programming requires more concentration than other activities. It's the reason programmers get upset about 'quick interruptions' - such interruptions are tantamount to asking a juggler to keep three balls in the air and hold your groceries at the same time",
   "If you cannot grok the overall structure of a program while taking a shower, you are not ready to code it.",
   "When to use iterative development? You should use iterative development only on projects that you want to succeed.",
   "There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies. The first method is far more difficult.",
   "Before software can be reusable it first has to be usable.","Design and programming are human activities; forget that and all is lost.",
   "It's better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive.",
   "Good code is its own best documentation. As you’re about to add a comment, ask yourself, How can I improve the code so that this comment isn’t needed?’ Improve the code and then document it to make it even clearer.", 
   "Documentation is the castor oil of programming. Managers think it is good for programmers and programmers hate it!.",
   "One principle problem of educating software engineers is that they will not use a new method until they believe it works and, more importantly, that they will not believe the method will work until they see it for themselves.",
   "It's hard enough to find an error in your code when you're looking for it; it's even harder when you've assumed your code is error-free.",
   "More computing sins are committed in the name of efficiency (without necessarily achieving it) than for any other single reason - including blind stupidity.",
   "The belief that complex systems require armies of designers and programmers is wrong. A system that is not understood in its entirety, or at least to a significant degree of detail by a single individual, should probably not be built.",
   "Program testing can be used to show the presence of bugs, but never to show their absence!","Every good work of software starts by scratching a developer's personal itch",
   "Even the best planning is not so omniscient as to get it right the first time.","Adding manpower to a late software project makes it later!",
   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time."
  ]
  const [votes, upVote] = useState(Array(quotes.length-1).fill(0))

  const setGood = () => {
    setToGood(good+1)
  }

  function setBad(){
    setToBad(bad+1)
  }

  function setNeutral(){
    setToNeutral(neutral+1)
  }

  const NextQuote = ()=>{
    let maxi = (quotes.length-1) * Math.random()
    maxi = Math.round(maxi)
    setSelected(maxi)
  }

  const vote = index=>{
    let cur = [...votes]
    cur[index] =  cur[index]?(cur[index]+1):1
    upVote(cur)
  }


  return (
    <div>
      <Head />
      <Buttons callback={setGood} text="Good" />
      <Buttons callback={setNeutral} text="Neutral" />
      <Buttons callback={setBad} text="Bad" />

      <StatTitle text="Statistics"/>
      <div className='tblcontainer'><table>
      <Statistics text="Good" count={good} />
      <Statistics text="Neutral" count={neutral} />
      <Statistics text="Bad" count={bad} />
      </table></div>
      <StatisticsOveral data={{good:good,neutral:neutral,bad:bad}} />
      
      <StatTitle text="Anecdote of the day"/>
      <div className='quote-container'>
        <Quote text={quotes[selected]} />
        <CountVote votes={votes} sel={selected} />
      </div>
      <Buttons callback={NextQuote} text="NextQuote" />
      <Buttons callback={()=>vote(selected)} text="Vote it!" />

      <StatTitle text="Anecdote with most votes"/>
      <BestQuote quotes={quotes} votes={votes} />

    </div>
  )
}

export default App