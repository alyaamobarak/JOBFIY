import React from 'react'
import { useRouteError, Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import notImg from '../assets/images/not-found.svg'
const NotFound = () => {
  const error = useRouteError()

  console.log(error);

  return (
    <Wrapper>
      <div >
        <img src={notImg} alt="Not Found" />
        <h3>Ohh! page not found</h3>
        <p>we can't seem to find the page you are looking for</p>
        <Link to='/dashboard'>back home</Link>
      </div>

      {error?.message && (
        <div className="text-center mt-5 text-danger d-block">
          <h4>{error.message}</h4>
        </div>
      )}
    </Wrapper>


  )
}


export default NotFound