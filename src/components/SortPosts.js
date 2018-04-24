import React from 'react'
import { Button } from 'react-bootstrap'

const SortPosts = props => {
    const { onUpdateSort }  = props
        return (
            <div className="SortContent">
                <span>Sorted by: </span>
                <Button onClick={() => onUpdateSort('-timestamp')} >Data</Button>
                <Button onClick={() => onUpdateSort('-voteScore')} >Score</Button>
            </div>
        )
    
}

export default SortPosts