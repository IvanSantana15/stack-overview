import { Link } from 'react-router-dom'

const QuestionListItem = ({question,Answers, technology, id}) => {

    
  return (
    <div className='row py-3 border-top mx-0' key={id}>

    <div className="col-md-auto  ">
      <span
        className={ "border border-success  fs-6 font-weight-light p-1" }
      >Repuestas: {Answers.length}</span>
    </div>

    <div className="col-md-8  ">

      <Link className="text-decoration-none" to={`/preguntas/${id}`}><span style={{ "fontSize": "20px" }} className='h6 d-block'>{question}</span> </Link>
      {technology.map((tec, index) => <span style={{ "fontSize": "12px" }} className=' m-2 bg-info p-1' key={index}>{tec}</span>)}
    </div>
  </div>
  )
}

export default QuestionListItem