/** @format */

export default function Navbar() {
  return (
    <>
      <nav className="flex border-b-2 border-gray-200 justify-between items-center p-3 max-w-[800px] w-full mx-auto">
        <h1 className="text-2xl font-bold">EduConvert</h1>
        <ul>
          <li className="">Login</li>
          <li className="bg-yellow-300 outline-0">Sign Up </li>
        </ul>
      </nav>
    </>
  );
}
