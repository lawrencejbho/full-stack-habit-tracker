import Mango from "../../images/mango.png";
import Habby from "../../images/habby.svg";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="tw-font-Poppins">
      <div className="tw-container tw-flex tw-mt-4 sm:tw-mt-12 tw-items-center ">
        <div className="tw-py-3 ">
          <img src={Habby} className="tw-w-32" />
        </div>
        <div className="tw-hidden tw-py-5 tw-list-none tw-flex tw-flex-1 tw-items-center tw-justify-end tw-gap-12 tw-text-xs tw-uppercase tw-text-bookmark-blue sm:tw-flex">
          <a href="#features" className="tw-text-inherit">
            <li className="tw-cursor-pointer">Features</li>
          </a>
          <a href="#faq" className="tw-text-inherit">
            <li className="tw-cursor-pointer">Learn More</li>
          </a>
          <a href="#contact" className="tw-text-inherit">
            <li className="tw-cursor-pointer">Contact</li>
          </a>

          <Link to="/login">
            <button
              type="button"
              className="tw-rounded-md tw-bg-gradient-to-r tw-bg-red-500
 tw-px-7 tw-py-3 tw-uppercase tw-text-white tw-border-none tw-font-light hover:tw-bg-red-600"
            >
              Login
            </button>
          </Link>
        </div>
        <div className="tw-py-6 tw-flex tw-flex-1 tw-justify-end sm:tw-hidden">
          <i className="fas fa-bars tw-text-2xl tw-pr-2"></i>
        </div>
      </div>
    </div>
  );
}

//               className="tw-rounded-md tw-bg-bookmark-red  tw-px-7 tw-py-3 tw-uppercase tw-text-white tw-border-none tw-font-light hover:tw-bg-red-500"
