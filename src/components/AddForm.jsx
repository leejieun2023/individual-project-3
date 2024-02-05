import { useState } from "react";
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addLetter } from "../redux/modules/letters";

export default function AddForm() {

    const dispatch = useDispatch();
    const artists = ['민지', '하니', '다니엘', '해린', '혜인'];
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const [artist, setArtist] = useState(artists[0]);

    const handleSubmit = event => {
        event.preventDefault();
        if (nickname === '' || content === '') {
            alert("닉네임과 내용을 모두 입력해주세요.");
            return;
        }

        const now = new Date();
        const koreanDateTimeFormat = new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        const letter = {
            id: uuidv4(),
            nickname,
            content,
            writedTo: artist,
            createdAt: koreanDateTimeFormat.format(now)
        };

        dispatch(addLetter(letter));
        setNickname('');
        setContent('');
        setArtist(artists[0]);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormONE>
                    <FormRow>
                        <p>닉네임 : </p>
                        <Input
                            type="text"
                            value={nickname}
                            onChange={event => setNickname(event.target.value)}
                            placeholder="최대 10자까지 작성할 수 있습니다."
                            maxLength={10}>
                        </Input>
                    </FormRow>
                    <FormRow>
                        <p>ㅤ내용 : </p>
                        <Textarea
                            value={content}
                            onChange={event => setContent(event.target.value)}
                            placeholder="최대 200자까지 작성할 수 있습니다."
                            maxLength={200}>
                        </Textarea>
                    </FormRow>
                    <FormRow>
                        <p>누구에게 보낼까요 ?</p>
                        <Select
                            value={artist}
                            onChange={event => setArtist(event.target.value)}>
                            {artists.map(artist => (
                                <option key={artist} value={artist}>{artist}</option>
                            ))}
                        </Select>
                        <Button type="submit">
                            Send a letter 💌
                        </Button>
                    </FormRow>
                </FormONE>
            </Form>
        </div>
    );
};

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    background-color: rgb(206, 232, 255);
    padding: 30px;
    font-family: 'IBM Plex Sans KR', cursive;
`;
const FormONE = styled.div`
    background-color: #003d82;
    color: white;
    width: 600px;
    height: 320px;
    border-radius: 20px;
`;
const FormRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;
const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    width: 400px;
    margin: 20px;
`;
const Textarea = styled.textarea`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    width: 400px;
    height: 100px;
    margin: 20px;
`;
const Select = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    margin-left: 10px;
    margin: 20px;
`;
const Button = styled.button`
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-left: 51px;
    cursor: pointer;
`;