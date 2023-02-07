import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createCharacter} from '@/actions/createCharacter';
import {Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const CharacterCreationPage = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const handleCreateCharacter = (character) => {
        dispatch(createCharacter(character));
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
    }

    return (
        isLoggedIn ?

            <div>
                {
                    <Container>
                        <Form>
                            <Form.Group className='mb-3' controlId='formName'>
                                <Form.Label>Character Name:</Form.Label>
                                <Form.Control type='text' placeholder='Character Name' value={name}
                                              onChange={handleNameChange}/>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formGender'>
                                <Form.Label>Gender:</Form.Label>
                                <Row>
                                    <Col xs={6}>
                                        <FontAwesomeIcon icon='fa-solid fa-mars'/>
                                    </Col>
                                    <Col xs={6}>
                                        <FontAwesomeIcon icon='fa-solid fa-venus'/>
                                    </Col>
                                </Row>

                            </Form.Group>
                        </Form>

                        <button onClick={() => handleCreateCharacter(/* character object */)}>Create Character</button>
                    </Container>}


            </div>
            :
            <div>
                You must be logged in to create a character.
            </div>
    )
}

export default CharacterCreationPage;