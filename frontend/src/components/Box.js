import React from "react";
import shader from "shader";
import Tooltip from "@mui/material/Tooltip";

function Box(props) {
  function changeColor() {
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

  // function changeColor() {
  //   if (props.contributions === 1) {
  //     return "#9be9a8";
  //   } else if (1 < props.contributions && props.contributions < 4) {
  //     return "#40c463";
  //   } else if (4 <= props.contributions && props.contributions < 7) {
  //     return "#30a14e";
  //   } else if (props.contributions >= 7) {
  //     return "#216e39";
  //   }
  // }

  const styles = {
    backgroundColor: changeColor(),
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
