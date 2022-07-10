import Course from './components/Course'
import courses_datas from './data/Courses'

const App = () => {
  return (
    <Course course={courses_datas} />
  )
}

export default App