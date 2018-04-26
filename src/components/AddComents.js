import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as actions from '../redux/actions'
import uuidv1 from 'uuid/v1'
import { connect } from 'react-redux'

import '../css/Comments.css'

class CommentsList extends Component {

    state = {
        id:'',
        timestamp: '',
        body: '',
        author: '',
        parentId: ''
    }

    onInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        if( (this.state.author === '' || this.state.author === null) || 
            (this.state.body === '' || this.state.body === null)) {
                return
        }
        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            body: this.state.body,
            author: this.state.author,
            parentId: this.props.parentId
        }
        this.props.fetchAddComment(data)
        this.setState({ 
            id:'',
            timestamp: '',
            body: '',
            author: '',
            parentId: ''
        })
        this.props.fetchAllPosts()
    }

    render() {
        return (
            <div className="CommentsTitulo">
                <Form className="addpost-form" onSubmit={this.onSubmit}>
                    <Form.Input
                        required
                        name="author"
                        value={this.state.author}
                        onChange={this.onInputChange}
                        label="Autor: "
                        placeholder="Autor"
                    />
                    <Form.TextArea
                        required
                        name="body"
                        value={this.state.body}
                        onChange={this.onInputChange}
                        label="Comentar: "
                        placeholder="Comente aqui !"
                        rows={5}
                    />
                    <Form.Button name="submitButton" color="teal" compact size="large">
                        Incluir Comentário
                    </Form.Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
})

export default connect(mapStateToProps, actions)(CommentsList)