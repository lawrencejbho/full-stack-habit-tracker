import React from "react";

export default function License() {
  return (
    <>
      <div className="tw-bg-gray-300 tw-mx-10 tw-border tw-mt-10 tw-border-solid tw-border-slate-400">
        <div className="tw-font-Poppins tw-px-10 tw-py-4 tw-text-justify">
          <h2 className="tw-font-normal tw-text-2xl tw-underline tw-underline-offset-4">
            The MIT License
          </h2>

          <p>
            Copyright (c) [2023] Lawrence Ho, {`<lawrence.jb.ho@gmail.com>`}
          </p>
          <p>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:{" "}
          </p>
          <p>
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.{" "}
          </p>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>
      </div>
      <a
        href="https://www.github.com/lawrencejbho/habit-tracker"
        className="tw-text-de"
      >
        <p className="tw-font-Poppins tw-text-center tw-text-inherit tw-text-slate-600">
          Fork this project to create your own MIT license that you can always
          link to.
        </p>
      </a>
    </>
  );
}
