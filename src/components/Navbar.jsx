/** @format */

import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="flex border border-gray-200 justify-between items-center p-3 max-w-[px] w-[85%] m-auto">
        <h1 className="text-2xl font-bold border">ConvertZilla</h1>
        <div className="flex justify-between items-center pr-0.5">
          <Link
            className="border-1 cursor-pointer rounded font-bold mr-1.5 p-2"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="font-bold text-dark-blue bg-neon-green hover:neon-green-500 cursor-pointer rounded p-2"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
}
