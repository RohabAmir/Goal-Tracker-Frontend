import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGoals, fetchGoals } from "../../../redux/goal/goalSlice";
import { getLocalId } from "../../../utils/jwtToken";

import { Spinner } from "../../Spinner/Spinner";

import "./DeleteModal.scss";

export const DeleteModal = ({ setDelModal, id, goalName }) => {
  const dispatch = useDispatch();
  const [delInput, setDelInput] = useState("");
  const delBtnClassName = `${delInput === "delete" ? "button" : "disable"}`;
  const { deleteGoalsSuccess, deleteGoalsLoading } = useSelector(
    (state) => state.goals
  );

 

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(
      deleteGoals({
        uid: getLocalId(),
        goalId: id,
      })
    ).then(() => {
      dispatch(fetchGoals());
      setDelModal(false); // Close the modal after successful submission
    });
  };

  return (
    <div
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setDelModal(false);
        }
      }}
      className="deleteModal__container"
    >
      {deleteGoalsLoading ? (
        <Spinner />
      ) : (
        <div className="deleteModal">
          <h1>Delete Goal({goalName})?</h1>
          <form onSubmit={submitForm}>
            <input
              type="text"
              placeholder="To confirm deletion, please type 'delete'"
              onChange={(e) => setDelInput(e.target.value)}
              value={delInput}
            />

            <div>
              <span
                onClick={() => {
                  setDelModal(false);
                }}
                className="btn-1"
              >
                Cancel
              </span>
              <button
                type="submit"
                disabled={delInput !== "delete"}
                className={delBtnClassName}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
