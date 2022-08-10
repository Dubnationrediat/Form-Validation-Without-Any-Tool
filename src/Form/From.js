import React, { useEffect, useState } from 'react'
import './Form.css'
function From() {
    const initialValue = {
        firstname:'',
        lastname:'',
        email:'',
        password:''
    }
    const [fromForm, setfromForm] = useState(initialValue);
    // for error handling 
    const [formErrors, setFormErrors] = useState({});
    // flag for submit
    const [isSubmit, setisSubmit] = useState(false)
    // to show and hide form 
    const [showHide, setshowHide] = useState("show")
    let changeHandler = (e)=>{
      const{name,value}=e.target
      setfromForm({...fromForm,[name]:value})
    }
    let submittHandler = (e)=>{
         e.preventDefault();
         setFormErrors(validate(fromForm))
         setisSubmit(true)
         setfromForm(initialValue)
    }
    useEffect(() => {
        console.log(formErrors)
      if(Object.keys(formErrors).length===0 && isSubmit){
        console.log(fromForm)
      }
    }, [formErrors])
    

    // validate function 
        const validate=(values)=>{
        const errors={ }
        // regex for email
        const regex1 = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        // regex for password
        const regex2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if(!values.firstname){
            errors.firstname="user first name is required"
        }
        if(!values.lastname){
            errors.lastname="user last name is required"
        }

        if(!values.email){
            errors.email="user email is required"
        }else if(!regex1.test(values.email)){
            errors.email='This is not a valid email'
        }
        if(!values.password){
            errors.password="user password is required"
        }else if(values.password.length < 8 || values.password.length >10 ||!regex2.test(values.password)){
            errors.password = "Minimum eight characters, at least one letter, one number and one special character:"
        }

return errors;
}

  return (
    <div>
{Object.keys(formErrors).length===0 && isSubmit?(<h3 className='success'>Signed in successfully</h3>):(<h3 className='success'>please fill the form below</h3>)}

      <div className='main'>
                <h1>Login Page</h1>
        <div   >

            {/* just to see what is inserted live */}
            {/* <pre>{JSON.stringify(fromForm,undefined,2)}</pre> */}  

      <form className={showHide}action="" onSubmit={submittHandler}>
        <label htmlFor="FristName">Frist Name</label>
        <br />
        <input name="firstname" className='FristName' type="text" value={fromForm.firstname} onChange={changeHandler}/>
        <br />
        {formErrors.firstname}
        <br /> <br />
        <label htmlFor="LastName">Last Name</label>
        <br />
        <input name="lastname"  className='LastName'type="text" value={fromForm.lastname} onChange={changeHandler} />
        <br />
        {formErrors.lastname}
        <br /> <br />
        <label htmlFor="Email">Email</label>
        <br />
        <input name='email' className='Email' type="text" value={fromForm.email} onChange={changeHandler}  />
        <br />
        {formErrors.email}
        <br /> <br />
        <label htmlFor="Password">password</label>
        <br />
        <input name='password' className='Password' type="text" value={fromForm.password} onChange={changeHandler} />
        <br /><br />
        <br />
        {formErrors.password}
        <button type="submit">Submit</button>
      </form>
      </div>
      </div>
    </div>
  )
}

export default From

//Email validation
/*<input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
or
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ */




// for password validation (options)

/* Minimum eight characters, at least one letter and one number:
"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

Minimum eight characters, at least one letter, one number and one special character:
"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"

Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$" */