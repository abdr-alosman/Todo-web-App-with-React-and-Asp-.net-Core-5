import React, { Component } from 'react';

export class User {
    constructor() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
    }

}

export class KayitOl extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", user: new User(), loading: true };
        this.intialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    async intialize() {

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Userler/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", user: data, loading: false });
        }
        else {

            this.state = { title: "Create", user: new User(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Users</h3>
                {contents}
            </div>
        );
    }


    handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        if (this.state.user.id) {
            const response1 = fetch('api/Userler/' + this.state.user.id, { method: 'PUT', body: data });
            this.props.history.push('/fetch-user');
        }
        else {

            const response2 = fetch('api/Userler/', { method: 'POST', body: data });
            this.props.history.push('/fetch-user');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-user');
    }



    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.user.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" placeholder="First Name" type="text" name="firstName" defaultValue={this.state.user.firstName} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Last Name" type="text" name="lastName" defaultValue={this.state.user.lastName} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" placeholder=" Email" type="email" name="email" defaultValue={this.state.user.email} required />

                    </div>
                </div>
               
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" placeholder=" password" type="password" name="password" defaultValue={this.state.user.password} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Confirm Password" type="password" name="confirmPassword" defaultValue={this.state.user.confirmPassword} required />
                    </div>
                </div>
               

                <div className="form-group">
                    <button type="submit" className="btn btn-success mr-3" value={this.state.user.id}>Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>

        );
    }





}


