import Mango from "../../images/mango.png";

export default function Footer() {
  return (
    <>
      <div className="tw-bg-bookmark-blue py-8 tw-font-Poppins">
        <div className="tw-container tw-flex tw-flex-col tw-items-center md:tw-flex-row">
          <div className="tw-pt-4 tw-flex tw-flex-1 tw-flex-wrap tw-items-center tw-justify-center tw-gap-12 md:tw-justify-start">
            <div className="tw-flex tw-items-center tw-justify-center">
              <img src={Mango} alt="" className="tw-w-12 tw-h-12 " />
              <h1 className="tw-text-bookmark-white">HaTr</h1>
            </div>
            <div className="tw-list-none tw-flex tw-gap-12 tw-text-xs tw-uppercase tw-text-white">
              <li className="tw-cursor-pointer">Features</li>
              <li className="tw-cursor-pointer">Learn More</li>
              <li className="tw-cursor-pointer">Contact</li>
            </div>
          </div>
          <div className=" tw-flex tw-mt-0">
            <ul className="tw-flex tw-list-none tw-gap-10">
              <li>
                <i
                  className="fab fa-twitter tw-text-2xl tw-text-white"
                  text-2xl
                ></i>
              </li>
              <li>
                <i className="fab fa-facebook-square tw-text-2xl tw-text-2xl tw-text-white"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
