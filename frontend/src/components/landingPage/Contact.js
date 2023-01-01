export default function Contact() {
  return (
    <>
      <section
        className="tw-bg-bookmark-purple tw-py-16 tw-text-white tw-font-Poppins"
        id="contact"
      >
        <div className="tw-container ">
          <div className="tw-mx-auto sm:tw-w-3/4 lg:tw-w-2/4">
            {/* <p className="tw-mb-8 tw-text-center tw-font-light tw-uppercase">
              Have joined.
            </p> */}
            <h1 className="tw-text-center tw-text-3xl tw-font-normal">
              Stay up to date
            </h1>
            <div className="tw-mt-8 tw-flex tw-flex-col tw-gap-6 sm:tw-flex-row">
              <input
                type="text"
                placeholder="Enter your email"
                className="tw-rounded-mx tw-text-base tw-flex-1 tw-px-2 tw-py-3 tw-text-black focus:tw-outline-none"
              />
              <button
                type="button"
                className="tw-btn tw-text-white tw-text-base tw-flex-1 tw-border-none tw-rounded-md tw-bg-bookmark-red hover:tw-bg-red-500"
              >
                Join our mailing list
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
