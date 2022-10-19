import React, { useState, useEffect } from "react";
import ContributionGraph from "../components/ContributionGraph.js";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Analytics() {
  const [habits, setHabits] = useState([]);
  const [currentHabitId, setCurrentHabitId] = useState("");

  const [renderState, setRenderState] = useState(false);

  // MUI code for the dropdown menu

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // clicking the menu item will set the habit Id and then render the contribution graph
  const handleClickDisplayGraph = (event) => {
    setCurrentHabitId(event.target.id);
  };

  // setHabits to pull from our database
  useEffect(() => {
    const getHabits = async () => {
      const data = await fetch("/api/habit-get");
      const get_data = await data.json();
      // console.log(get_data);
      setHabits(get_data);
      setRenderState(true);
    };
    getHabits();
  }, [renderState]);

  return (
    <div>
      <h1 className="white-text">Analytics</h1>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {habits.map((habit) => {
          return (
            <MenuItem
              onClick={handleClickDisplayGraph}
              onClose={handleClose}
              // onBlur={handleClose}
              id={habit.id}
            >
              {habit.habit_name}
            </MenuItem>
          );
        })}
      </Menu>

      <div className="contribution-graph-container">
        {habits.map((habit) => {
          if (habit.id === currentHabitId) {
            return <ContributionGraph timestamps={habit.timestamps} />;
          }
        })}
      </div>
    </div>
  );
}

export default Analytics;
