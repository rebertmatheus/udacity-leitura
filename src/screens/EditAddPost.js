import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import { Form, Header } from 'semantic-ui-react'
import uuidv1 from 'uuid/v1'
import '../css/App.css'
import 'semantic-ui-css/semantic.min.css'

const categories = [
  { key: 1, text: 'React', value: 'react' },
  { key: 2, text: 'Redux', value: 'redux' },
  { key: 3, text: 'Udacity', value: 'udacity' }
]

class EditAddPost extends Component {

    state = {
        op: '',
        id: '',
        title: '',
        author: '',
        body: '',
        category: ''
    }

    componentDidMount() {
        if(this.props.match.params.id != null){
            console.log('Entrou AQUI !')
            this.setState({op:'Edit'})
            this.props.posts.filter( post => {
                if(post.id === this.props.match.params.id) {
                  this.setState({ id: post.id })
                  this.setState({ title: post.title })
                  this.setState({ author: post.author })
                  this.setState({ body: post.body })
                  this.setState({ category: post.category })
                }
                return null
            })
        } else {
            this.setState({op:'Add'})
        }
    }

    setCategory = (e, data) => {
        this.setState({ category: data.value })
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
        const data = {
            id: this.state.op ==='Add'?  uuidv1() : this.state.id,
            timestamp: Date.now(),
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.state.category
        }
        this.props.fetchAddPost(data)
        this.props.history.push('/')
    }

    onCancel = ( ) => {
        this.props.history.push('/')
    }

    render() {
        const { op } = this.state
        return (
            <div>
                <div className="page-wrapper">
                    <div className="add-post-form ">
                        <Header className="add-post-header" textAlign="center" color="teal" as="h1" >
                            { op === 'Add' ? 'Adicionar Post' : 'Editar Post' }
                        </Header>
                        <Form className="addpost-form" onSubmit={this.onSubmit}>
                            <Form.Input
                                required
                                name="title"
                                id="title"
                                value={this.state.title}
                                onChange={this.onInputChange}
                                label="Insira o título"
                                placeholder="Insira o título"
                            />
                            <Form.Input
                                required
                                name="author"
                                value={this.state.author}
                                onChange={this.onInputChange}
                                label="Autor"
                                placeholder="Autor"
                            />

                            <Form.TextArea
                                required
                                name="body"
                                value={this.state.body}
                                onChange={this.onInputChange}
                                label="Conteúdo"
                                placeholder="Conteúdo"
                                rows={5}
                            />
                            <Form.Select
                                required
                                name="category"
                                placeholder="Categoria"
                                label="Selecione a Categoria"
                                value={this.state.category}
                                onChange={this.setCategory}
                                options={categories}
                            />
                            <Form.Button  color="teal" compact size="large">
                                {this.state.op}
                            </Form.Button>
                            <Form.Button  onClick={this.onCancel}> Cancel </Form.Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ posts }) => ({
  posts
})

export default connect(mapStateToProps, actions)(EditAddPost)