import React from "react";
import shader from "shader";
import Tooltip from "@mui/material/Tooltip";

function Box(props) {
  const colors = {
    Halloween: ["#ffee4a", "#ffc501", "#fe9600", "#03001c"],
    Christmas: ["#00FF5D", "#00B341", "#FF231A", "#B30700"],
    Default: ["#9be9a8", "#40c463", "#30a14e", "#216e39"],
  };

  function randomColor() {
    if (props.contributions === 1) {
      return shader(props.randomColor, 0.4);
    } else if (1 < props.contributions && props.contributions < 4) {
      return shader(props.randomColor, 0);
    } else if (4 <= props.contributions && props.contributions < 7) {
      return shader(props.randomColor, -0.3);
    } else if (props.contributions >= 7) {
      return shader(props.randomColor, -0.6);
    }
  }

  function selector() {
    if (props.contributions === 1) {
      return colors[props.color][0];
    } else if (1 < props.contributions && props.contributions < 4) {
      return colors[props.color][1];
    } else if (4 <= props.contributions && props.contributions < 7) {
      return colors[props.color][2];
    } else if (props.contributions >= 7) {
      return colors[props.color][3];
    }
  }

  const styles = {
    backgroundColor: props.color == "Random" ? randomColor() : selector(),
  };

  return (
    <div>
      <Tooltip
        title={`${props.contributions} contributions on ${props.date}`}
        placement="top"
      >
        <div className="box" style={styles} onClick={props.handleClick}></div>
      </Tooltip>
    </div>
  );
}

export default Box;
