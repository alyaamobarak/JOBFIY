import React,{useEffect} from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import Links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import Navlinks from './Navlinks';
const SmallSideBar = () => {
//  const data= useDashboardContext()
 const {toggleSideBar,showSidebar} =useDashboardContext()
 console.log('Context:', showSidebar);

//  console.log(data)
  return (
    <Wrapper>
       <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button className='close-btn' type='button' onClick={toggleSideBar}> <FaTimes/> </button>
          <header> <Logo/> </header>
          {/* <div className='nav-links'>
            {Links.map((link)=>{
             const {text ,icon,path}=link
             return <NavLink to={path} key={text} className='nav-link' onClick={toggleSideBar}  end>
               <span className='icon'> {icon} </span>
               {text}
             </NavLink>
            })}
          </div> */}
          <Navlinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSideBar

// import React from 'react';
// import Wrapper from '../assets/wrappers/SmallSidebar';
// import { useDashboardContext } from '../context/DashboardContext';
// import { FaTimes } from 'react-icons/fa';
// import Logo from './Logo';
// import Links from '../utils/Links';
// import { NavLink } from 'react-router-dom';

// const SmallSideBar = () => {
//   const { toggleSideBar, showSidebar } = useDashboardContext();

//   return (
//     <Wrapper>
//       <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
//         <div className="content">
//           <button className="close-btn" type="button" onClick={toggleSideBar}>
//             <FaTimes />
//           </button>
//           <header>
//             <Logo />
//           </header>
//           <div className="nav-links">
//             {Links.map((link) => {
//               const { text, icon, path } = link;
//               return (
//                 <NavLink to={path} key={text} className="nav-link" onClick={toggleSideBar} end>
//                   <span className="icon">{icon}</span>
//                   {text}
//                 </NavLink>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default SmallSideBar;
