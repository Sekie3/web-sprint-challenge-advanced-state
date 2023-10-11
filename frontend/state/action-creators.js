// ❗ You don't need to add extra action creators to achieve MVP
import { INPUT_CHANGE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE,
         SET_SELECTED_ANSWER, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from "./action-types";
import axios from "axios";

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE
  };
}

export function selectAnswer(answerId) {
  console.log('selectAnswer action creator called with:', answerId);
  return dispatch => {
    dispatch({ type: 'SET_SELECTED_ANSWER', payload: answerId });
    dispatch({ type: SET_INFO_MESSAGE, payload: '' }); 
}}

export function setMessage() { }

export function setQuiz() { }

export function inputChange(id, value) {
  return {
      type: INPUT_CHANGE,
      payload: { id, value }
  };
}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:9000/api/quiz/next');
      
      if (response.status === 200) {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: response.data });
      }
    } catch (error) {
      dispatch({ type: SET_INFO_MESSAGE, payload: "Error: Could not fetch quiz!" });
    }
  };
}

export function postAnswer(quizId, answerId) {
  return async function (dispatch) {
    try {
      dispatch({ type: SET_QUIZ_INTO_STATE, payload: null })
      const response = await axios.post(`http://localhost:9000/api/quiz/answer`, { quiz_id: quizId, answer_id: answerId });

      if (response.status === 200) {
        if (response.data.message.includes("Nice job!")) {
          dispatch({ type: SET_INFO_MESSAGE, payload: "Nice job! That was the correct answer" });
        } else {
          dispatch({ type: SET_INFO_MESSAGE, payload: "What a shame! That was the incorrect answer" });
        }
        dispatch(fetchQuiz());
      }
    } catch (error) {
      console.log("Answer ID posted:", answerId, "quiz id", quizId)
      dispatch({ type: SET_INFO_MESSAGE, payload: "Error: Could not submit answer!" });
    }
  };
}

export function postQuiz() {
  return async function (dispatch, getState) {
      const { newQuestion, newTrueAnswer, newFalseAnswer } = getState().form;

      const payload = {
          question_text: newQuestion,
          true_answer_text: newTrueAnswer,
          false_answer_text: newFalseAnswer
      };

      try {
          const response = await axios.post('http://localhost:9000/api/quiz/new', payload);
          if (response.status === 201) {
            dispatch({ type: RESET_FORM });
            dispatch({ type: SET_INFO_MESSAGE, payload: `Congrats: "${newQuestion}" is a great question!`});
            dispatch(fetchQuiz());
        }
      } catch (error) {
          if (error.response && error.response.status === 422) {
              dispatch({ type: SET_INFO_MESSAGE, payload: "Error: Malformed payload!" });
          } else {
              dispatch({ type: SET_INFO_MESSAGE, payload: "Error: Could not create quiz!" });
          }
      }
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state