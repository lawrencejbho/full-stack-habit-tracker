import React from "react";
import settingsIcon from "../images/settings.png";
import helpIcon from "../images/help.png";

function Header() {
  return (
    <>
      <header>
        <div className="header-container">
          <img
            className="header-settings-icon"
            src={settingsIcon}
            alt="settings icon"
          />
          <div>Settings</div>
          <img className="header-help-icon" src={helpIcon} alt="help icon" />
          <div>Help</div>
        </div>
      </header>
    </>
  );
}

export default Header;
