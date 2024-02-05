import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from 'components/common/Avatar';
import { deleteLetter, editLetter } from "../redux/modules/letters";
import { useSelector, useDispatch } from 'react-redux';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const letters = useSelector(state => state.letters);

  const letter = letters.find((letter) => String(letter.id) === id);

  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');

  const dispatch = useDispatch();

  if (!letter) {
    return null;
  }

  //수정
  const handleEdit = () => {
    setEditing(true);
    setEditedContent(letter.content);
    setOriginalContent(letter.content);
  };

  const handleUpdate = () => {
    if (editedContent === originalContent) {
      alert('아무런 수정사항이 없습니다.');
      setEditing(false);
      return;
    }
    dispatch(editLetter({id: letter.id, editingText: editedContent}));
    setEditing(false);
  };

  //삭제
  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까 ?')) {
      dispatch(deleteLetter(id));
      navigate('/');
    }
  };

  //Home으로 이동
  const goHome = () => {
    navigate('/');
  };


  return (<>
    <LetterBox>
      <HomeButton onClick={goHome}>Home 🏡</HomeButton>
      <MiniLetterBox>
        <TobDiv>
          <Avatar src={letter.avatar || 'https://i.pinimg.com/236x/a5/e8/4d/a5e84dd8104ba6287b72e16401d173d7.jpg'} alt="avatar" />
        </TobDiv>
        <TobDiv>  
            <p>[{letter.nickname}]ㅤ{letter.createdAt}</p>
        </TobDiv>
        <Content>
          {editing ? (
            <Textarea value={editedContent} onChange={(event) => setEditedContent(event.target.value)} />
          ) : (
            letter.content
          )}
        </Content>
        <div>
          {editing ? (
            <Button onClick={handleUpdate}>수정 완료 💕</Button>
          ) : (
            <Button onClick={handleEdit}>수정 📝</Button>)}
          <Button onClick={handleRemove}>삭제 🗑️</Button>
        </div>
      </MiniLetterBox>
    </LetterBox>
  </>
  );
}

const LetterBox = styled.div`
  background-color: rgb(206, 232, 255);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'IBM Plex Sans KR', cursive;
`;
const MiniLetterBox = styled.div`
  background-color: rgb(172, 207, 238);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  height: 500px;
`;
const Content = styled.div`
  background-color: #346487;
  width: 700px;
  height: 200px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  color: white;
  padding: 10px;
  margin: 20px;
`;
const Textarea = styled.textarea`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-family: 'IBM Plex Sans KR', cursive;
  font-size: medium
`
const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid black;
  margin: 10px;
  cursor: pointer;
`;
const HomeButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  margin: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
`;
const TobDiv = styled.div`
  align-items: flex-start;
  font-size: 20px;
`;
