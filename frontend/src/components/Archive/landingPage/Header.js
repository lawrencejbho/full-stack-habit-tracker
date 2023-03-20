import Habby from "../../images/habby.svg";

import { Menu } from "@headlessui/react";

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
 tw-px-7 tw-py-3 tw-uppercase tw-text-white tw-border-none tw-font-light hover:tw-bg-red-600 tw-cursor-pointer"
            >
              Login
            </button>
          </Link>
        </div>

        <div className="tw-py-6 tw-flex tw-flex-1 tw-justify-end sm:tw-hidden tw-z-20">
          <Menu>
            <Menu.Button className="tw-border-0 tw-bg-transparent">
              <i className=" fas fa-bars  tw-text-2xl tw-pr-2"></i>
            </Menu.Button>
            <Menu.Items className="tw-absolute tw-right-0 tw-mt-8  tw-w-28 tw-origin-top-right tw-divide-y tw-divide-gray-100 tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none">
              <div className="tw-m-1 tw-p-1 tw-pl-2 tw-rounded-md hover:tw-bg-sky-500 ">
                <Menu.Item className="">
                  <a className="tw-text-inherit " href="#features">
                    Features
                  </a>
                </Menu.Item>
              </div>
              <div className="tw-m-1 tw-p-1 tw-pl-2 tw-rounded-md hover:tw-bg-sky-500 ">
                <Menu.Item>
                  {({ active }) => (
                    <a className="tw-text-inherit " href="#faq">
                      Learn More
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="tw-m-1 tw-p-1 tw-pl-2 tw-rounded-md hover:tw-bg-sky-500 ">
                <Menu.Item>
                  {({ active }) => (
                    <a className="tw-text-inherit " href="#contact">
                      Contact
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="tw-m-1 tw-p-1 tw-pl-2 tw-rounded-md hover:tw-bg-sky-500 ">
                <Menu.Item>
                  {({ active }) => (
                    <a className="tw-text-inherit" href="/login">
                      Login
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
}
