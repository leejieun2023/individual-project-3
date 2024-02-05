import React, { useEffect, useState, useContext  } from 'react';
import styled from 'styled-components';
import AddForm from 'components/AddForm';
import { useNavigate } from 'react-router-dom';
import Avatar from 'components/common/Avatar'
import fakeData from 'fakeData.json'
import { LettersContext } from 'LettersContext';

const Tob = styled.div`
  background-color: rgb(0, 0, 0);
  height: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  background-color: #003d82;
`;
const Header = styled.div`
  background-Image: url(/KakaoTalk_20240130_121022128.jpg);
  height: 550px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 3px 4px 5px black;
  font-family: 'Shadows Into Light Two', cursive;
`;
const Tab = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  background-color: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  border-radius: 10px;
  width: 70px;
  height: 40px;
  box-shadow: 0px 0px 15px black;
  font-family: 'IBM Plex Sans KR', cursive;
`;
const TabPoint = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  margin: 30px 0 0 0;
`;
const TabList = styled.div`
  background-color: rgb(206, 232, 255);
  display: flex;
  justify-content: center;
`;
const LetterBox = styled.div`
  background-color: rgb(206, 232, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Sans KR', cursive;
`;
const MiniLetterBox = styled.div`
  background-color: rgb(172, 207, 238);
  border-radius: 15px;
  width: 600px;
  height: 200px;
  margin: 10px;
  cursor: pointer;
`;
const ListItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: row;
  display: flex;
  align-items: center;
  margin: 20px;
`;
const Contant = styled.p`
  max-width: 350px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-direction: column;
`;
const First = styled.p`
  margin: 30px;
`;

function Home() {
  const artists = ['민지', '하니', '다니엘', '해린', '혜인'];
  const [activeTab, setActiveTab] = useState(artists[0]);
  const { letters, setLetters } = useContext(LettersContext);

  useEffect(() => {
    if (letters.length === 0) {
      setLetters(() => fakeData);
    }
  }, [letters, setLetters]);

  const fillteredItem = letters.filter(item => item.writedTo === activeTab).slice().reverse();

  const navigate = useNavigate();

  return (
    <div>
      <Tob>
        <p>NewJeans</p>
        <p>🤍🐇🤍🐇🤍🐇💘</p>
      </Tob>

      <Header>
        NewJeans fanletters
      </Header>

      <TabList>
        {artists.map(artist => (
          <TabPoint>
            <Tab
              key={artist}
              active={activeTab === artist}
              onClick={() => setActiveTab(artist)}
            >
              {artist}
            </Tab>
          </TabPoint>
        ))}
      </TabList>

      <AddForm setLetters={setLetters}/>

      <LetterBox>
        {fillteredItem.length > 0 ? (
          fillteredItem.map(item => (
            <MiniLetterBox key={item.id}>
              <ListItem onClick={() => navigate(`/Detail/${item.id}`)}>
                <Avatar src={item.avatar || 'https://i.pinimg.com/236x/a5/e8/4d/a5e84dd8104ba6287b72e16401d173d7.jpg'} alt="avatar" />
                <div>
                  <p>닉네임 : {item.nickname}</p>
                  <p>작성일 : {item.createdAt}</p>
                  <Contant>ㅤ내용 : {item.content}</Contant>
                </div>
              </ListItem>
            </MiniLetterBox>
          ))
        ) : (
          <First>남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되어보세요!</First>
        )}
      </LetterBox>
    </div >
  )
}

export default Home;