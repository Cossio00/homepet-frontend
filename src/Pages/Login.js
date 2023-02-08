import React from 'react';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('Seu email é: '+this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        E-mail
                        <input type="email" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Senha
                        <input type="password"/>
                    </label>
                    <input type="button" value="Entrar"></input>
                </form>
                <div>
                    <a href="https://www.google.com">Criar nova conta</a>
                </div>

            </div>
        )
    }
}

export default Login;