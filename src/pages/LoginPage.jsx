/** @format */

export default function LoginPage() {
  return (
    <>
      <section className="flex min-h-[100vh]  ">
        {/* Left Column */}
        <div
          className="flex-6 flex-col justify-center border p-[80px] bg-white text-black"
          id="left-column"
        >
          <h1 className="text-center text-5xl font-bold">ConvertZilla</h1>
          <div className="text-center text-3xl font-bold my-5">
            Login to your account
          </div>
          <div
            className="flex justify-between items-center max-w-[400px] 
          m-auto mt-2 py-3 *:px-5 *:py-1.5 *:rounded *:border *:font-bold"
          >
            <a href="">Facebook</a>
            <a href="">Google</a>
            <a href="">SS0</a>
          </div>
          <div>
            <input type="Email" placeholder="Enter your email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>

          <p className="text-center mt-3">
            <a href="" className="underline decoration-red-500 text-red-500 font-bold">
              Forgot Password?
            </a>
          </p>
          <div className="text-center mt-3 cursor-pointer">
            <button className="text-[var(--color-dark-blue)] bg-[var(--color-neon-green)] hover:bg-[var(--color-neon-green-500)] font-bold cursor-pointer outline-0 rounded px-5 py-1.5">
              Log in
            </button>
          </div>

          <p className="text-center mt-3">
            Dont have an account?{" "}
            <a
              href=""
              className="underline decoration-[var(--danger-color)] text-[var(--danger-color)] font-bold"
            >
              Create an account
            </a>
          </p>
        </div>
        <div></div>
        <div className="flex-4 flex-col justify-center p-[60px] border">
          {/* right column */}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo quos
          qui possimus magnam velit? Nesciunt consequuntur aperiam impedit
          molestias accusamus rem et, doloremque delectus ducimus minima
          recusandae repellat, qui eos quam nostrum nulla aliquid,
          exercitationem iure similique veniam ratione omnis est nemo! Assumenda
          debitis earum doloribus, quisquam consectetur delectus tempore enim
          fugiat repellendus, itaque accusantium? Omnis similique eos aliquid
          doloribus! Eveniet molestiae magnam, labore temporibus laudantium odit
          doloribus minus totam, quos explicabo officia, aut possimus delectus
          id recusandae? Iusto excepturi eveniet sit dolores architecto labore
          assumenda suscipit ipsa numquam quas, molestiae molestias esse nemo,
          quisquam omnis soluta dicta aliquid. Temporibus.
        </div>
      </section>
    </>
  );
}
