import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import { Form, Header, Icon } from 'semantic-ui-react'

class EditComment extends Component {
    state = {
        author: '',
        body: ''
    }

    componentDidMount() {
        this.props.fetchComment(this.props.match.params.id).then(() => {
            this.setState({ author: this.props.comments.author })
            this.setState({ body: this.props.comments.body })
        })
    }

    handleChange = e => {
        let target = e.target
        let value = target.value
        let name = target.name

        this.setState({
            [name]: value
        })
    }

    submit = e => {
        e.preventDefault()
        const data = {
            id: this.props.comments.id,
            author: this.state.author,
            body: this.state.body
        }
        this.props.fetchEditComment(data, data.id)
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="add-post-form ">
                    <Header className="editcomment-header" textAlign="center" color="teal" as="h1">
                        Editar Comentário
                    </Header>
                    <Form onSubmit={this.submit}>
                        <Form.Input
                            required
                            id="author"
                            name="author"                
                            value={this.state.author}
                            onChange={this.handleChange}
                            label="Autor"
                        />

                        <Form.TextArea
                            required
                            id="body"
                            name="body"
                            value={this.state.body}
                            onChange={this.handleChange}
                            label="Comentário"
                            rows={6}
                        />
                        <Form.Button
                            name="form-button-control-public"
                            color="teal"
                            compact
                            size="large"
                        >
                        <Icon name="edit" />
                            Editar
                        </Form.Button>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ comments }) => ({
    comments
})

export default connect(mapStateToProps, actions)(EditComment)