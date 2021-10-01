import React, { Component } from "react"
import { Link } from 'react-router-dom'


export class FetchUsers extends Component {
    static displayName = "Users";

    constructor() {
        super();
        this.state = { users: [], loading: true }
    }

    componentDidMount() {
        this.UsersData();
    }

    static handleEdit(id) {
        window.location.href = "/user/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Do You want to delete the user! : " + id)) {
            return;
        }
        else {
            fetch('api/Userler/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-user";
                    alert('Deleted Successfully !');
                })
        }
    }

    static renderProdutosTabela(users) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel" >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>operations</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            






                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(user.id)}>Edit</button>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(user.id)}>Delete</button>
                            </td>

                        </tr>

                    )}
                </tbody>
            </table>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em> Loading... </em> </p>
            : FetchUsers.renderProdutosTabela(this.state.users);

        return (
            <div>
                <h1 id="tabelLabel" >Userler</h1>
                <p>Mevcut Kullanıcılar</p>
                <p>
                    <Link to="/add-user">Yeni user Oluştur</Link>
                </p>
                {contents}
            </div>
        );
    }


    async UsersData() {
        const response = await fetch('api/Userler');
        const data = await response.json();
        this.setState({ users: data, loading: false });
    }

}