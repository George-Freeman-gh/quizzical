import { useEffect, useState } from 'react';
import './App.css';
import Start from './Components/Start';
import { nanoid } from 'nanoid';
import Question from './Components/Question';






function App() {





const [questions, setQuestions] =useState([])
const [isLoading, setIsLoading] = useState(true);
const [gameOver, setGameOver]  = useState(false)
const [count, setCount] = useState(0)
const [resetQuiz, setResetQuiz] = useState(false)

const [start, setStart] = useState(false)

const toggleStart = () => {
  document.body.style.overflow = 'auto';
  setStart(true)
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


useEffect(() => {
  fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
  .then(response => response.json())
  .then(data => {
    let q = []

    data.results.forEach(question=> {
         q.push({
          question: question.question,
          questionId: nanoid(),
          shuffledAnswers: shuffleArray([...question.incorrect_answers,question.correct_answer]).map(answer => ({
            answer,
            id: nanoid(),
            isSelected: false
          })),
          correctAnswer: question.correct_answer
  })
  setIsLoading(false);
          setQuestions(q)

       })
  });
},[resetQuiz])


if (isLoading) {
  return <div>Loading...</div>
}



const toggleSelected = (event, questionId) => {


  if(gameOver === true){
    return
  }
   
  setQuestions(prevQuestions => {
    return prevQuestions.map(question => {
      if (question.questionId === questionId) {
        return {
          ...question,
          shuffledAnswers: question.shuffledAnswers.map(answer => {
            return {
              ...answer,
              isSelected: answer.id === event.target.id
            };
          })
        };
      }
      return question;
    });
  });


};


const countCorrect = () => {
 
  let correct = 0;

  questions.forEach(question => {
  question.shuffledAnswers.forEach(answer => {
  if(answer.isSelected === true && answer.answer === question.correctAnswer){
  
    correct++
  }
  })
  })

  setCount(correct)
  setGameOver(true)
}



const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const reset = ()  => {

  setResetQuiz(prev => !prev)
  setCount(0)
  setGameOver(false)
  scrollToTop()


}




  return (
    <div className="App" >

     {start ? 
     
     <div className='quiz-content'>
     <Question 
    questions={questions}
    toggleSelected={toggleSelected}
    gameOver={gameOver}
    />

    {gameOver === false && <button onClick={countCorrect} className='button'>Check Answers</button>}
    {gameOver && <button onClick={reset} className='button'>New Quiz</button>}
  {<h4 className='correct-count'>you got {count} correct</h4>} 
  <img className='yellow-blob-quiz' src='/Images/yellow-blob-quiz.svg'/>
     </div>
    
    


     :
   <div className='start-wrap'>
    

<Start toggleStart={toggleStart} />
</div>
    } 
     

  

     
      


    </div>
  );
}

export default App;
