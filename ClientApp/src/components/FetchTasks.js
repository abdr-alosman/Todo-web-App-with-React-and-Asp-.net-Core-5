import React, { Component } from "react"
import { Link } from 'react-router-dom'


export class FetchTasks extends Component {
    static displayName = "Tasks";

    constructor() {
        super();
        this.state = { tasks:[], loading: true }
    }

    componentDidMount() {
        this.TasksData();
    }

    static handleEdit(id) {
        window.location.href = "/task/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Do You want to delete the task! : " + id)) {
            return;
        }
        else {
            fetch('api/Gorevler/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-task";
                    alert('Deleted Successfully !');
                })
        }
    }

    static renderProdutosTabela(tasks) {
       
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel" >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Description</th>
                        <th>Görev tarihi</th>
                        <th>Tamamlanma durumu</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { tasks.map(task =>
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.gorevTanimi}</td>
                            <td>{task.gorevTarihi.substring(0, 10)}</td>
                            {task.isComplated === false &&
                                <td>Tamamlanmadı</td>
                            }
                            {task.isComplated === true &&
                                <td>Tamamlandı</td>
                            }
                            
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(task.id)}>Edit</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(task.id)}>Delete</button>
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
            : FetchTasks.renderProdutosTabela(this.state.tasks);

        return (
            <div>
                <h1 id="tabelLabel" >Görevler</h1>
                <p>Mevcut Görevleriniz</p>
                <p>
                    <Link to="/add-task">Yeni Görev Oluştur</Link>
                </p>
                {contents}
            </div>
        );
    }


    async TasksData() {
        const response = await fetch('api/Gorevler');
        const data = await response.json();
        this.setState({ tasks:data, loading: false });
    }

}