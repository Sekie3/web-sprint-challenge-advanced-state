import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  
  const onChange = evt => {
    const { id, value } = evt.target;
    props.inputChange(id, value);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    console.log("Form Submitted with Data:", props.form); 

    const newQuiz = {
      question_text: props.form.newQuestion.trim(),
      true_answer_text: props.form.newTrueAnswer.trim(),
      false_answer_text: props.form.newFalseAnswer.trim()
    };

    props.postQuiz(newQuiz);
  }

  const isFormValid = 
    props.form.newQuestion.trim().length > 0 &&
    props.form.newTrueAnswer.trim().length > 0 &&
    props.form.newFalseAnswer.trim().length > 0;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer} />
      <button id="submitNewQuizBtn" disabled={!isFormValid}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, actionCreators)(Form)
