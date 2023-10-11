// ❗ You don't need to add extra reducers to achieve MVP
import { INPUT_CHANGE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, RESET_FORM, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from './action-types'
import { combineReducers } from 'redux'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE:
      return state + 1;
    case MOVE_COUNTERCLOCKWISE:
      return state - 1;
    default:
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return action.payload;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case 'SET_SELECTED_ANSWER':
      return action.payload; 
    default:
      return state;
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
      case SET_INFO_MESSAGE:
          return action.payload;
      default:
          return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {

  switch (action.type) {
      case INPUT_CHANGE:
          return {
              ...state,
              [action.payload.id]: action.payload.value
          };
      case RESET_FORM:
          return initialFormState;
      default:
          return state;
  }
}



export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })