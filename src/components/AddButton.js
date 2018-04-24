import React from 'react'
import { Link } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/lib/md'

import '../css/AddButton.css'

const AddButton = props => {
    return (
        <div className="divAdd">
            <Link to='/AddPost'><MdAddCircle className="AddButton"/></Link>
        </div>
    )
}

export default AddButton