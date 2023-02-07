import React, { useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { createCharacter } from '@/actions/createCharacter';

const CharacterCreationPage = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();

    const handleCreateCharacter = (character) => {
        dispatch(createCharacter(character));
    }

    return (
        isLoggedIn ?
            <div>
                {/* Render character creation form here */}
                <button onClick={() => handleCreateCharacter(/* character object */)}>Create Character</button>
            </div>
            :
            <div>
                You must be logged in to create a character.
            </div>
    )
}

export default CharacterCreationPage;