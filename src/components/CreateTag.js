import React, { useState } from 'react'

const CreateTag = (tag, setTag) => {

    // tagを配列としてstateに格納して、
    // map関数で取り出し、ul下のliに表示する。
    // const [createdTag, setCreatedTag] = useState();
    
    return (
        <ul className='tagList'>
            {tag.map((_tag) => 
                <li key={_tag.id}>
                    <input value={_tag} />
                </li>
            )}
        </ul>
    )
}

export default CreateTag