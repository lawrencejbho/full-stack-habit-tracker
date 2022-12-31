import Feature1 from "../../images/landingPage/illustration-features-tab-1.png";
import Feature2 from "../../images/landingPage/illustration-features-tab-2.png";
import Feature3 from "../../images/landingPage/illustration-features-tab-3.png";

import { useRef } from "react";

export default function Features() {
  return (
    <>
      <div className="tw-mt-20 tw-py-20 tw-font-Poppins" id="features">
        {/* Heading */}
        <div className="tw-mx-auto tw-px-2 sm:tw-w-3/4 lg:tw-w-5/12">
          <h1 className="tw-text-center tw-text-3xl tw-text-bookmark-blue">
            Features
          </h1>
          <p className="tw-mt-4 tw-text-center tw-text-bookmark-grey">
            Habitica is a free habit-building and productivity app that treats
            your real life like a game. With in-game rewards and punishments to
            motivate you and a strong social network to inspire you, Habitica
            can help you achieve your goals to become healthy, hard-working, and
            happy.
          </p>
        </div>
        {/* Cards */}
        <div className="tw-container tw-mt-16 tw-grid tw-max-w-screen-lg tw-grid-cols-1 tw-gap-16 md:tw-grid-cols-2 lg:tw-grid-cols-3">
          {/* Card 1 */}
          <div className="tw-flex tw-flex-col tw-rounded-md tw-shadow-md lg:tw-mb-16">
            <div className="tw-flex tw-flex-col tw-items-center tw-p-6">
              <img src={Feature1} alt="" className="tw-h-5/6 tw-w-full" />
              <h3 className="tw-mt-5 tw-mb-2 tw-text-lg tw-font-normal tw-text-bookmark-blue md:tw-pt-5">
                Track Your Habits and Goals
              </h3>
              <p className=" tw-font-light tw-text-bookmark-grey">
                Stay accountable by tracking and managing your Habits, Daily
                goals, and To Do list with Habitica’s easy-to-use mobile apps
                and web interface.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="tw-flex tw-flex-col tw-rounded-md tw-shadow-md lg:tw-my-8">
            <div className="tw-flex tw-flex-col tw-items-center tw-p-6">
              <img src={Feature2} alt="" className="tw-h-3/5 tw-w-full" />
              <h3 className="tw-mt-5 tw-mb-2 tw-text-lg tw-font-normal tw-text-bookmark-blue">
                Earn Rewards for Your Goals
              </h3>
              <p className=" tw-font-light tw-text-bookmark-grey">
                Check off tasks to level up your Avatar and unlock in-game
                features such as battle armor, mysterious pets, magic skills,
                and even quests!{" "}
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="tw-flex tw-flex-col tw-rounded-md tw-shadow-md lg:tw-mt-16">
            <div className="tw-flex tw-flex-col tw-items-center tw-p-6">
              <img
                src={Feature3}
                alt=""
                // className="tw-h-5/6 tw-w-5/6 md:tw-h-2/3 md:tw-w-2/3 lg:tw-w-5/6 lg:tw-h-5/6"
                className="tw-h-5/6 tw-w-5/6"
              />
              <h3 className="tw-mt-5 tw-mb-2 tw-text-lg tw-font-normal tw-text-bookmark-blue">
                Battle Monsters with Friends
              </h3>
              <p className="tw-mb-2 tw-font-light tw-text-bookmark-grey">
                Fight monsters with other Habiticans! Use the Gold that you earn
                to buy in-game or custom rewards, like watching an episode of
                your favorite TV show.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
