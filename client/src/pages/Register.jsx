import React from 'react'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import customFetch from '../utils/customFetch'
import { Logo, FormRow } from '../components'
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';
  console.log(isSubmitting);
  return (
    <Wrapper>

      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name='name' defaultValue="alya" />
        <FormRow type="text" name='lastName' labelText='Last Name' defaultValue="mobarak" />
        <FormRow type="text" name='location' defaultValue="erith" />
        <FormRow type="email" name='email' defaultValue="ama789238@gmail.com" />
        <FormRow type="password" name='password' defaultValue="12345678" />

        {/* <div className='form-row'>
        <label htmlFor="name" className='form-lable'>Name</label>
        <input type="text"  name='name' id='name' className='form-input' required defaultValue="alya"/>

        <label htmlFor="nameLast" className='form-lable'>Last Name</label>
        <input type="text"  name='name' id='nameLast' className='form-input' required/>

        <label htmlFor="loc" className='form-lable'>location</label>
        <input type="text"  name='location' id='loc' className='form-input' required/>

        <label htmlFor="mail" className='form-lable'>email</label>
        <input type="email"  name='email' id='mail' className='form-input' required/>

        <label htmlFor="pass" className='form-lable'>password</label>
        <input type="password"  name='password' id='pass' className='form-input' required/>
      </div> */}
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>

          {isSubmitting ? 'submitting...' : 'submit'} </button>
        <p>Already a member?<Link to='/login' className='member-btn'>Login </Link> </p>

      </Form>
    </Wrapper>

  )
}

export default Register