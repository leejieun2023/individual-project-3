import fakeData from 'fakeData.json'

const ADD_LETTERS = 'ADD_LETTERS';

export const addLetters = (payload) => {
    return {
      type: ADD_LETTERS,
      payload,
    };
  };

  const initialState = fakeData;

// 1.새로운 게시글 생성 addLetter
// 2.삭제 id - deleteLetter
// 3.수정 - modifyLetter

const letters = (state = initialState, action) => {
    switch (action.type) {
      case ADD_LETTERS:
        return [action.payload, ...state];
      default:
        return state;
    }
  };
  
export default letters;