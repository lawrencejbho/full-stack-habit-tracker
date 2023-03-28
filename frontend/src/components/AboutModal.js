import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function AboutModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="tw-flex tw-items-center tw-justify-center tw-z-50">
        <button
          type="button"
          onClick={openModal}
          className="tw-rounded-md tw-font-Rubik tw-bg-black tw-bg-opacity-20 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white hover:tw-bg-opacity-30 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-white focus-visible:tw-ring-opacity-75"
        >
          About
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="tw-relative tw-z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
          </Transition.Child>

          <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
            <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="tw-w-full tw-max-w-md tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                  <Dialog.Title
                    as="h3"
                    className="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900 tw-font-Rubik"
                  >
                    About
                  </Dialog.Title>
                  <div className="tw-mt-2">
                    <p className="tw-text-sm tw-text-gray-500 tw-font-Rubik">
                      Wrapped Plus allows you to sign in with your Spotify
                      account to view your top Artists, Songs, and Genres. You
                      can search for new songs or play your favorites directly
                      in the built in web player that will also show the lyrics.
                      <br />
                      <br />
                      Made by{" "}
                      <a
                        href="https://github.com/lawrencejbho"
                        className="tw-text-blue-500 tw-cursor-pointer"
                        target="_blank"
                      >
                        Lawrence Ho
                      </a>
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="tw-inline-flex tw-font-Rubik tw-justify-center tw-rounded-md tw-border tw-border-transparent tw-bg-blue-100 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-blue-900 hover:tw-bg-blue-200 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-blue-500 focus-visible:tw-ring-offset-2"
                      onClick={closeModal}
                    >
                      Ok!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
