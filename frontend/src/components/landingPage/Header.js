import Mango from "../../images/mango.png";

export default function Header() {
  return (
    <div className="tw-font-Poppins">
      <div className="tw-container tw-mt-4 tw-flex tw-items-start sm:tw-mt-12 ">
        <div className="tw-py-3">
          <img src={Mango} className="tw-w-12" />
        </div>
        <h1 className="tw-text-bookmark-blue tw-px-1">HaTr</h1>

        <div className="tw-hidden tw-py-5 tw-list-none tw-flex tw-flex-1 tw-items-center tw-justify-end tw-gap-12 tw-text-xs tw-uppercase tw-text-bookmark-blue sm:tw-flex">
          <li className="tw-cursor-pointer ">Features</li>
          <li className="tw-cursor-pointer">Pricing</li>
          <li className="tw-cursor-pointer">Contact</li>
          <button
            type="button"
            className="tw-rounded-md tw-bg-bookmark-red tw-px-7 tw-py-3 tw-uppercase tw-text-white tw-border-none tw-font-light"
          >
            Login
          </button>
        </div>
        <div className="tw-py-6 tw-flex tw-flex-1 tw-justify-end sm:tw-hidden">
          <i className="fas fa-bars tw-text-2xl"></i>
        </div>
      </div>
    </div>
  );
}
