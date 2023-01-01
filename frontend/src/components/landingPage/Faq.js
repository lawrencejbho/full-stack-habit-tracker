export default function Faq() {
  return (
    <>
      <div className="tw-bg-bookmark-white tw-py-20 tw-font-Poppins" id="faq">
        <div className="tw-container">
          <div className="tw-mx-auto tw-px-2 sm:tw-w-3/4 lg:tw-w-5/12">
            <h1 className="tw-text-center tw-text-3xl tw-text-bookmark-blue tw-font-normal">
              Frequently Asked Questions
            </h1>
            <p className="tw-mt-4 tw-text-center tw-text-bookmark-grey">
              Here are some of our FAQs.
            </p>
          </div>
          {/* FAQ Items */}
          {/* trying to figure out how to get the border  */}
          <div className="tw-mx-auto tw-mt-12 tw-flex tw-flex-col sm:tw-w-3/4 lg:tw-w-5/12">
            <div className="tw-flex tw-items-center tw-py-4">
              <div className="tw-flex-1">What is a Bookmark</div>
              <i className="fas fa-chevron-down tw-text-bookmark-purple"></i>
            </div>
            <hr className="tw-border-b tw-bg-bookmark-red" />

            <div className="tw-flex tw-items-center tw-border-b tw-py-4">
              <span className="tw-flex-1">What is a Bookmark</span>
              <i className="fas fa-chevron-down tw-text-bookmark-purple"></i>
            </div>
            <div className="tw-flex tw-items-center tw-border-b tw-py-4">
              <span className="tw-flex-1">What is a Bookmark</span>
              <i className="fas fa-chevron-down tw-text-bookmark-purple"></i>
            </div>
            <div className="tw-flex tw-items-center tw-border-b-8 tw-py-4">
              <span className="tw-flex-1">What is a Bookmark</span>
              <i className="fas fa-chevron-down tw-text-bookmark-purple"></i>
            </div>
            <button
              type="button"
              className="tw-text-white tw-font-medium tw-text-base tw-self-center tw-bg-gradient-to-r tw-from-purple-500 tw-via-purple-600 tw-to-purple-700  tw-shadow-md tw-border-none tw-py-3 tw-px-7 tw-rounded-md hover:tw-bg-gradient-to-br"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
