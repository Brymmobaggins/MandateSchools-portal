/** @format */

export default function UpLoadSection() {
  const x = 20;
  const y = 30;
  const loggedIn = false;

  return (
    <>
      <div className="border text-center w-[85%] m-auto" id="page-container">
        <h1 className="text-4xl font-bold">PDF to WORD Converter</h1>
        <p className="border mt-2">Convert your PDF to word seamlessly.</p>
      </div>

      <div>
        {" "}
        The sum of {x} and {y} is {x + y}
      </div>
      <ul>
        ``
        {}
      </ul>
      {loggedIn ? <h1>Welcome bakare</h1> : <h1>Hello Guest</h1>}
    </>
  );
}
