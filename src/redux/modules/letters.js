import fakeData from "fakeData.json";

const ADD_LETTER = "letters/ADD_LETTER";
const DELETE_LETTER = "letters/DELETE_LETTER";
const EDIT_LETTER = "letters/EDIT_LETTER";

export const addLetter = (payload) => {
  return {
    type: ADD_LETTER,
    payload,
  };
};

export const deleteLetter = (payload) => {
  return {
    type: DELETE_LETTER,
    payload,
  };
};

export const editLetter = (payload) => {
  return {
    type: EDIT_LETTER,
    payload,
  };
};

const initialState = fakeData;

// 1.새로운 게시글 생성 addLetter
// 2.삭제 id - deleteLetter
// 3.수정 - editLetter

const letters = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LETTER:
      return [action.payload, ...state];

    case DELETE_LETTER:
      const filteredLetters = state.filter(
        (letter) => letter.id !== action.payload
      );
      return filteredLetters;

    case EDIT_LETTER:
      const newLetters = state.map((letter) => {
        if (letter.id === action.payload.id) {
          return { ...letter, content: action.payload.editingText };
        }
        return letter;
      });
      return newLetters;

    default:
      return state;
  }
};

export default letters;