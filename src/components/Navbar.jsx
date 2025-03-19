/** @format */

export default function Navbar() {
  return (
    <>
      <nav className="flex border border-gray-200 justify-between items-center p-3 max-w-[px] w-[85%] m-auto">
        <h1 className="text-2xl font-bold border">EduConvert</h1>
        <ul className="flex justify-between items-center border pr-0.5">
          <li className="border cursor-pointer mr-1.5">Login</li>
          <li className="bg-yellow-300 outline-0 cursor-pointer">Sign Up </li>
        </ul>
      </nav>
    </>
  );
}
