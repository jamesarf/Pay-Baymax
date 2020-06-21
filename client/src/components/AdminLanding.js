import React, { Component } from 'react'
import { get_all_employee, all_from_employee_by_to_employee_id } from './UserFunctions'
import axios from 'axios'

class AdminLanding extends Component {
    constructor(){
        super()
        this.state = {
            employees:[],
            reviews: [],
            permissionFor: [],
            from_employee_ids: [],
            open_reviews_for:[],
        }
    }
    open_reviews = (e, id) => {
        var emp = this.state.employees.filter(e => e.id == id)
        this.setState({
            permissionFor: [],
            open_reviews_for: emp
        })
        
        axios.get("/reviews/"+id)
        .then(res => {
            this.setState({
                reviews: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    open_permissions = (e, id) => {
        var emp = this.state.employees.filter(e => e.id == id)
        this.setState({
            open_reviews_for: [],
            permissionFor: emp
        })
        
        all_from_employee_by_to_employee_id(id).then(res => {
            var from_employee_ids = res.map(item => item.from_employee_id)
            this.setState({from_employee_ids})
        })
        .catch(err => {
            console.log(err)
        })
    }
    componentDidMount(){
        get_all_employee().then(res => {
            this.setState({employees: res})
        })
        .catch(err => {
            console.log(err)
        })
    }
    delete_employee = (e, id) => {
        axios.delete("/employee/"+id, {
        userInfo : localStorage.userInfo, 
        })
        .then(res => {
            if(res.status == 200){
                var empl = this.state.employees.filter((emp) => emp.id != id )
            }
            console.log(empl)
            this.setState({employees: empl})
        })
        .catch(err => {
            console.log(err)
        })
    }
    assign_review = (e, id) => {
        axios.post("/reviews/assign", {
            created_by : JSON.parse(localStorage.userInfo).id, 
            to_employee_id:this.state.permissionFor[0].id,
            from_employee_id:id
        })
        .then(res => {
            all_from_employee_by_to_employee_id(this.state.permissionFor[0].id).then(res => {
                var from_employee_ids = res.map(item => item.from_employee_id)
                this.setState({from_employee_ids})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    dissociate_review = (e, id) => {
        var to_employee_id = this.state.permissionFor[0].id;
        var from_employee_id = id;
        axios.delete("/reviews/dissociate/"+to_employee_id+"/"+from_employee_id)
        .then(res => {
            let from_employee_ids = this.state.from_employee_ids.filter(item => item != id)
            this.setState({
                from_employee_ids
            })
        })
        .catch(err => {
            console.log(err)
        })
    } 
  render() {
      var employeeList = this.state.employees.map((emp, index) =>
        
            <tr key={emp.id}>
                <th scope="row">{index+1}</th>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>
                    <button className="btn btn-sm btn-primary" onClick={e => this.open_reviews(e, emp.id)}>Reviews</button> 
                    <button className="btn btn-sm btn-secondary" onClick={e => this.open_permissions(e, emp.id)}>Review Permissions</button>
                    <button className="btn btn-sm btn-danger" onClick={e => this.delete_employee(e, emp.id)}>Delete</button>
                </td>
            </tr>
        )

        var employeeListAssign = this.state.employees.map((emp, index) =>
            this.state.permissionFor.length > 0 && emp.id != this.state.permissionFor[0].id &&
            <tr key={emp.id}>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>
                    {
                        this.state.from_employee_ids.length == 0 || !this.state.from_employee_ids.includes(emp.id.toString()) ? 
                        <button className="btn btn-sm btn-secondary" onClick={e => this.assign_review(e,emp.id)}>Add</button> 
                        :
                        <button className="btn btn-sm btn-success" onClick={e => this.dissociate_review(e,emp.id)}>Rem</button> 
                    }
                    
                </td>
            </tr>
        )

        var reviews = this.state.reviews.map((item, index) =>
        
            <tr key={item.id}>
                <th scope="row">{index+1}</th>
                <td>{item.first_name} {item.last_name}</td>
                <td>
                    {item.review}
                </td>
            </tr>
        )
    return (
        <div>
            <div className="row">
                <table className="table table-sm bg-light">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            employeeList
                        }
                    </tbody>
                </table>
            </div>
            {
                this.state.permissionFor.length > 0 &&
                <div className="row">
                    <h4 className="text-center">Assign reviewers for {this.state.permissionFor[0].first_name} {this.state.permissionFor[0].last_name}</h4>
                    <table className="table table-sm bg-light">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                employeeListAssign
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                this.state.open_reviews_for.length > 0 &&
                <div className="row">
                    <h4 className="text-center">Reviews for {this.state.open_reviews_for[0].first_name} {this.state.open_reviews_for[0].last_name}</h4>
                    <table className="table table-sm bg-light">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Reviewed By</th>
                            <th scope="col">Review</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                reviews
                            }
                        </tbody>
                    </table>
                </div>
            }
      </div>
    )
  }
}

export default AdminLanding