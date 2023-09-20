import { decode } from "html-entities";

const Question = (props) => {

const selectedColor = "#D6DBF5";





    return (
      <div >
        
        {props.questions.map((question) => (
          <div className="question-wrap" key={question.questionId}>
            <h1  className="question-title" id={question.questionId}>{decode(question.question)}</h1>
            {question.shuffledAnswers.map((answer) => (
              <p
                key={answer.id}
                className="answer-text"
                onClick={(event) => props.toggleSelected(event, question.questionId)}
                id={answer.id}
                style={props.gameOver ?  {background:answer.answer === question.correctAnswer ? "#94D7A2" : answer.isSelected ? "#F8BCBC" : "none"} : {background: answer.isSelected ? selectedColor : "none"}}
                
                          
              >
                {decode(answer.answer)}
              </p>
              
            ))}
            <hr></hr>
          </div>
        ))}
      </div>
    );
  };
  


export default Question 