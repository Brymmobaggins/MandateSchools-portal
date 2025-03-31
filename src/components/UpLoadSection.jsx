/** @format */
import { Link } from "react-router-dom";

export default function UpLoadSection() {
  return (
    <>
      <section className="flex flex-row justify-between gap-4 m-auto w-[85%] mt-10 p-5 border border-gray-200 rounded-lg shadow-md *:border *:hover:cursor-pointer *:p-5">
        <div className="transition duration-300 ease-in" id="first-card">
          <h1>PDF to Word</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            esse est dignissimos ex deserunt exercitationem voluptatem quas
            unde. Ut vitae nulla deleniti, iure ea eos veritatis rem beatae
            velit quidem?
          </p>
        </div>
        <div className="" id="second-card">
          <h1>Word to PDF</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            esse est dignissimos ex deserunt exercitationem voluptatem quas
            unde. Ut vitae nulla deleniti, iure ea eos veritatis rem beatae
            velit quidem?
          </p>
        </div>
        <div className="" id="second-card">
          <h1>PowerPoint to PDF</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            esse est dignissimos ex deserunt exercitationem voluptatem quas
            unde. Ut vitae nulla deleniti, iure ea eos veritatis rem beatae
            velit quidem?
          </p>
        </div>
        <div className="" id="second-card">
          <div className="text-right">
            <Link className="border border-[var(--warning-color)] rounded p-1 mr-0">
              Coming Soon
            </Link>
          </div>
          <h1>PDF to PowerPoint</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            esse est dignissimos ex deserunt exercitationem voluptatem quas
            unde. Ut vitae nulla deleniti, iure ea eos veritatis rem beatae
            velit quidem?
          </p>
        </div>
      </section>
    </>
  );
}
