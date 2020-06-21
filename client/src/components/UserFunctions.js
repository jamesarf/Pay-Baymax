import axios from 'axios'
// import jwt_decode from 'jwt-decode'

export const register = newUser => {
  return axios
    .post('signup', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      
    })
    .then(response => {
      return response.data
    })
}

export const login = user => {
  return axios
    .post('signin', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const get_all_employee = () => {
  return axios.get('employees', {
    userInfo : localStorage.userInfo, 
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const all_from_employee_by_to_employee_id = (id) => {
  return axios.get('reviews/from_employees/'+id, {
      userInfo : localStorage.userInfo, 
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}
export const all_to_employee_by_from_employee_id = (id) => {
  return axios.get('reviews/to_employees/19', {
      userInfo : localStorage.userInfo, 
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}
