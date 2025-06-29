import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn} from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post('/auth/login', data, { withCredentials: true });
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === 'submitting';
    const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', data, { withCredentials: true });
      toast.success('take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name='email' defaultValue="ama789238@gmail.com" />
        <FormRow type="password" name='password' defaultValue="12345678" />

        {/* <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'submit'}</button> */}
        <SubmitBtn formBtn/>
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>explore the app</button>

        <p>
          Not a member yet?<Link to='/register' className='member-btn '>Register</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
