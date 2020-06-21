import React, { Component } from 'react'
import AdminLanding from './AdminLanding'
import EmployeeLanding from './EmployeeLanding'

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            {
              localStorage.userInfo === undefined ?
              <h1 className="text-center">WELCOME</h1>
              :
              JSON.parse(localStorage.userInfo).role ? 
                <EmployeeLanding/>
                :
                <AdminLanding/>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Landing