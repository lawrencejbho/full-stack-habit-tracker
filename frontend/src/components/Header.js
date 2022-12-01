import React from "react";
import Mango from "../images/mango.png";

function Header() {
  return (
    <>
      <header>
        <img className="mango-icon" src={Mango} />
        <div class="white-text"> HaTr</div>
      </header>
    </>
  );
}

export default Header;
