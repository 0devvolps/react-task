import React from 'react';


class App extends React.Component{

    constructor(props){
        super(props)

        this.searching = this.searching.bind(this);
        this.state = {
            error: null,
            users: [],
            search: ''
        }
    }
    
    componentDidMount(){
        fetch("https://dummyjson.com/users")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    users: result.users
                });
            },
            (error) => {
                this.setState({
                    error
                })
            }
        )
    }

    searching(input){
        this.setState({
            search: input.target.value
        })
    }

    render(){
        const {error, users} = this.state;

        const searchedUsers = users.filter(user => {
            return user.firstName.toLowerCase().includes(this.state.search.toLowerCase())
        })

        if(error){
            return(
                <body className='error-page'>
                    <div>
                        <h1>Error {error.message}</h1>
                    </div>
                </body>
                
            ) 
        }
        else{
            return(
                <div className='container'>
                    <h1>Пользователи</h1>
                    <input id='search' placeholder='Поиск' type='text' onChange={this.searching}></input>
                    <table>
                        <tr>
                            <th>Фио</th>
                            <th>Возраст</th>
                            <th>Пол</th>
                            <th>Номер телефона</th>
                            <th>Адрес проживания</th>
                        </tr>
                        
                        <tr>
                            <td>
                                {searchedUsers?.map(user => (
                                    <p>{user.firstName} {user.maidenName} {user.lastName}</p>
                                ))}
                            </td>
                            <td>
                                {searchedUsers?.map(user => (
                                    <p>{user.age}</p>
                                ))}
                            </td>
                            <td>
                                {searchedUsers?.map(user => (
                                    <p>{user.gender}</p>
                                ))}
                            </td>
                            <td>
                                {searchedUsers?.map(user => (
                                    <p>{user.phone}</p>
                                ))}
                            </td>
                            <td>
                                {searchedUsers?.map(user => (
                                    <p>{user.address.address}, {user.address.city}</p>
                                ))}
                            </td>
                        </tr>
                    </table>
                </div>
            )
        }
    }
}

export default App