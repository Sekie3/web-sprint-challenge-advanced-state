import React from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, postAnswer, selectAnswer } from '../state/action-creators';
import { useEffect } from 'react';

function Quiz(props) {
  console.log('Quiz component rendered with props:', props);
  const { quiz, fetchQuiz, postAnswer, selectAnswer } = props;

  useEffect(() => {
    console.log('useEffect called with quiz:', props.quiz);
    if (!quiz) fetchQuiz();
  }, [fetchQuiz]);
  

  const handleAnswerClick = (answerId) => {
    props.selectAnswer(answerId);
  };
  
  const handleAnswerSubmit = () => {
    console.log('Quiz ID:', props.quiz);
    postAnswer(quiz.quiz_id, props.selectedAnswer);
  };
  
  useEffect(() => {
    if (!quiz) {
      fetchQuiz();
    } else {
    }
  }, [fetchQuiz, quiz]);

  return (
    <div id="wrapper">
      { quiz ? (
        <>
          <h2>{quiz.question}</h2>
          { quiz.answers.map((answer, index) => (
          <div key={index} className={`answer ${props.selectedAnswer === answer.answer_id ? "selected" : ""}`}>
            {answer.text}
            <button onClick={() => handleAnswerClick(answer.answer_id)}>
              {props.selectedAnswer === answer.answer_id ? "SELECTED" : "Select"}
            </button>
          </div>
        ))}
        <button 
          id="submitAnswerBtn" 
          onClick={handleAnswerSubmit} 
          disabled={!props.selectedAnswer}
        >
          Submit answer
        </button>

        </>
      ) : 'Loading next quiz...'}
    </div>
  );
          }

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer
});

const mapDispatchToProps = {
  fetchQuiz,
  postAnswer,
  selectAnswer
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
