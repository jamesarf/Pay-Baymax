import React, { Component } from 'react'
import { all_to_employee_by_from_employee_id } from './UserFunctions'
import axios from 'axios'

class EmployeeLanding extends Component {
  constructor(){
      super()
      this.state = {
          employees:[],
          review_id: null,
          review: "",
      }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount(){
    all_to_employee_by_from_employee_id(JSON.parse(localStorage.userInfo).id).then(res => {
          this.setState({employees: res})
      })
      .catch(err => {
          console.log(err)
      })
  }
  give_review_to = (e, id, review) => {
    this.setState({
      review_id:id,
      review
    })
  } 
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.value)
  }
  onSubmit(e) {
    e.preventDefault();
    axios.put("/reviews/"+this.state.review_id, {
      review : this.state.review, 
      })
        .then(res => {
          all_to_employee_by_from_employee_id(JSON.parse(localStorage.userInfo).id).then(res => {
            this.setState({
              employees: res,
              review_id: null,
              review: ""
            })
          })
          .catch(err => {
              console.log(err)
          })
        })
        .catch(err => {
            console.log(err)
        })

  }
  render() {
    console.log(this.state.employees)
    var employeeList = this.state.employees.map((emp, index) =>
            <tr key={emp.id}>
                <th scope="row">{index+1}</th>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.review}</td>
                <td>
                    <button className="btn btn-sm btn-primary" onClick={e => this.give_review_to(e, emp.id, emp.review)}>Review</button>
                </td>
            </tr>
        )
    return (
      <div className="container">
          <div className="row">
              <table className="table table-sm bg-light">
                  <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Review</th>
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
            this.state.review_id != null &&
            <div className="row">
              <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 font-weight-normal">Review</h1>
              
              <div className="form-group">
                <textarea className="form-control" onChange={this.onChange} name="review" id="exampleFormControlTextarea1" rows="3">
                  {this.state.review}
                </textarea>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
            </form>
            </div>
          }
      </div>
    )
  }
}

export default EmployeeLanding