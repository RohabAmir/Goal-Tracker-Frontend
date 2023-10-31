import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Goals } from "../../components/Goals/Goals";
import { CreateModal, createModal } from "../../components/Modal/CreateModal/CeateModal";
import { fetchGoals } from "../../redux/goal/goalSlice";
import { FolderOpen, Home, Logout, Setting, List } from "../../assets/icons";




import "./Dashboard.scss";


export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const { goals, goalsLoading, goalsError } = useSelector((state) => state.goals);
  const [addGoalModal, setAddGoalModal] = useState(false);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);
 

 

  const formatTimestamp = (timestamp) => {
    // Use moment to format the timestamp
    return moment.unix(timestamp).fromNow();
  };

  const GoalsFetched = goals.map((goal) => {
    return (
      <Goals
        goalName={goal.goalName?.goalName}
        // goals={goal.goalName?.goals} // currently is empty
        id={goal.id}
        timeStamp={formatTimestamp(goal.goalName?.createdAt?._seconds)}
      />
    );
  });

  const handleLogout = () => {
    localStorage.clear(); //clearing the tokens stored in local storage
    navigate("/login");
  };
  return (
    <>
    {addGoalModal && <CreateModal setModal={setAddGoalModal}/>}
      <div className="dashboard">
        <div className="dashboard__leftNavigation">
          <p className="dashboard__leftNavigation--logo">
            N<span>odes</span>
          </p>
          <div className="dashboard__leftNavigation--nav">
            <Link to="#" className="link active">
              <Home />
            </Link>
            <Link to="#" className="link">
              <List />
            </Link>
            <Link to="#" className="link">
              <FolderOpen />
            </Link>
            <Link to="#" className="link">
              <Setting />
            </Link>
          </div>
          <div className="link log">
            <Link to="/login">
              <Logout onClick={handleLogout} />
            </Link>
          </div>
        </div>
        <div className="dashboard__content">
          <div className="row">
            <h3>Our Goals</h3>
            <span onClick={()=> setAddGoalModal(true)}  className="btn">
              Create a goal
            </span>
          </div>
          <div className="goal-list">{GoalsFetched}</div>
        </div>
      </div>
    </>
  );
};
