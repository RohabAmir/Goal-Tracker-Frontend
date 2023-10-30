import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { createGoals, fetchGoals } from "../../redux/goal/goalSlice";

import "./Modal.scss";
import { getLocalId } from "../../utils/jwtToken";



export const Modal = ({ setModal }) => {
    const dispatch = useDispatch();

    const { createGoalsSuccess, createGoalsError } = useSelector((state) => state.goals)
    const [ createInput,setCreateInput ] = useState("");
    const createBtnClassName = `${ createInput === "" ? 'disable' : 'button'}`;

    const submitForm = (e) =>{
        e.preventDefault();
        dispatch(createGoals({
            uid: getLocalId(),
            goalName: createInput,
        }))
        .then(()=> {
            dispatch(fetchGoals());

        })
    }

  return (
    <div
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setModal(false);
        }
      }}
      className="modal__container"
    >
      <div className="modal">
        <h1>Create Goal?</h1>
        <form onSubmit={submitForm}>
          <input 
            type="text" 
            placeholder="Name Your Goal" 
            onChange={(e) => setCreateInput(e.target.value)}
            value={createInput}
            />
            
          <div>
            <span
              onClick={() => {
                setModal(false);
              }}
              className="btn-1"
            >
              Cancel
            </span>
            <button type="submit"
              disabled={createInput === ""}
              className={createBtnClassName}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};
