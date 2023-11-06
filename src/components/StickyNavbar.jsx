import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
 
import { Link  } from 'react-router-dom';

import { school } from '../assets';

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal"
      >
        {/* <a href="/students" className="flex items-center">
          Students
        </a> */}

        <Link to="/students">
          Students
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal"
      >
        {/* <a href="/roles" className="flex items-center">
          Roles
        </a> */}
        <Link to="/roles">
          Roles
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-normal"
      >
        {/* <a href="/filieres" className="flex items-center">
          Filieres
        </a> */}
        <Link to="/filieres">
          Filieres
        </Link>
      </Typography>
    </ul>
  );
 
  return (
    <div className="p-3 -m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll" style={{background: "#FFF7F7"}}>
      <nav className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
            <div className='flex items-center p-2'>
              <img src={school} width={50}/>
              <h2 className='text-3xl mx-2 font-sans font-semibold'>Student App</h2>
            </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
            <div className="mt-3 flex flex-column justify-center">
                {navList}
            </div>
        </MobileNav>
      </nav>
    </div>
  );
}