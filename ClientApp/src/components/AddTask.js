import React, { Component } from 'react';

export class Task {
    constructor() {
        this.id = 0;
        this.gorevTanimi = "";
        this.gorevTarihi = "";
        this.isComplated = "true";
    }
    
}

export class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", task: new Task(), loading: true };
        this.intialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    async intialize() {

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Gorevler/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", task: data, loading: false });
        }
        else {

            this.state = { title: "Create", task: new Task(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Taks</h3>
                {contents}
            </div>
        );
    }

    
    handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        if (this.state.task.id) {
            const response1 = fetch('api/Gorevler/' + this.state.task.id, { method: 'PUT', body: data });
            this.props.history.push('/fetch-task');
        }
        else {

            const response2 = fetch('api/Gorevler/', { method: 'POST', body: data });
            this.props.history.push('/fetch-task');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-task');
    }
   
    

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.task.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="gorevTanimi" defaultValue={this.state.task.gorevTanimi} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="date"  defaultValue={this.state.task.gorevTarihi} required  name="gorevTarihi" />
                    </div>

                </div>
                <div className="form-group row">
                    <div class="col-3">
                        <label className="col-form-label">Görev Tamamlandı mı : </label>

                    </div>
                    <div className="col-md-3">
                        <input type="checkbox" className="form-control" name="isComplated" defaultValue={this.state.task.isComplated} />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success mr-3" value={this.state.task.id}>Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>

        );
    }
    
    

  

}


