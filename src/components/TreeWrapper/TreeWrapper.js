import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useSnackbar } from "notistack";

import "./TreeWrapper.scss";


const initialWorkoutRoutine = {
  name: "Daily Workout",
  children: [
    {
      name: "Morning",
      children: [
        {
          name: "Cardio",
          children: [
            {
              name: "Running",
            },
            {
              name: "Cycling",
            },
          ],
        },
        {
          name: "Strength Training",
          children: [
            {
              name: "Push-ups",
            },
            {
              name: "Squats",
            },
          ],
        },
      ],
    },
    {
      name: "Evening",
      children: [
        {
          name: "Yoga",
          children: [
            {
              name: "Sun Salutation",
            },
            {
              name: "Downward Dog",
              children: [
                {
                  name: "Deep Breathing",
                },
                {
                  name: "Meditation",
                },
              ],
            },
          ],
        },
        {
          name: "Pilates",
          children: [
            {
              name: "The Hundred",
            },
            {
              name: "Leg Circles",
            },
          ],
        },
      ],
    },
    {
      name: "Night",
      children: [
        {
          name: "Stretching",
          children: [
            {
              name: "Neck Stretch",
            },
            {
              name: "Calf Stretch",
            },
          ],
        },
        {
          name: "Relaxation",
          children: [
            {
              name: "Deep Breathing",
            },
            {
              name: "Meditation",
            },
          ],
        },
        {
          name: "Aerobics",
          children: [
            {
              name: "Jumping Jacks",
            },
            {
              name: "High Knees",
            },
          ],
        },
      ],
    },
  ],
};

const Sidebar = ({ onAddChild, onRemoveChild }) => {
  const [parentNodeName, setParentNodeName] = useState("");
  const [childNodeName, setChildNodeName] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  // const classes = useStyles();

  const handleAddChild = () => {
    onAddChild(parentNodeName, { name: childNodeName });
    setChildNodeName("");
    enqueueSnackbar("Node has been added successfully", 
    { variant: 'success',
      // classes: { root : classes.root}
    });
  };

  const handleRemoveChild = () => {
    onRemoveChild(parentNodeName, childNodeName);
    setChildNodeName("");
    enqueueSnackbar("Node has been removed", { variant: "info",  });
  };

  return (
    <div className="sidebar">
      <form>
        <label>
          Parent Node:
          <input
            type="text"
            value={parentNodeName}
            onChange={(e) => setParentNodeName(e.target.value)}
          />
        </label>
        <label>
          Child Node:
          <input
            type="text"
            value={childNodeName}
            onChange={(e) => setChildNodeName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleAddChild}>
          Add Child
        </button>
        <button type="button" onClick={handleRemoveChild}>
          Remove Child
        </button>
      </form>
    </div>
  );
};

const TreeWrapper = () => {
  const [workoutRoutine, setWorkoutRoutine] = useState(initialWorkoutRoutine);
  const [expandedNodes, setExpandedNodes] = useState([]);

  useEffect(() => {
    const expandNodes = (node) => {
      let nodes = [];
      if (node.children || node._children) {
        nodes.push(node.name);
        if (node.children) {
          node.children.forEach((child) => {
            nodes = nodes.concat(expandNodes(child));
          });
        }
      }
      return nodes;
    };
    const expanded = workoutRoutine.children.flatMap(expandNodes);
    setExpandedNodes(expanded);
  }, [workoutRoutine]);

  const onNodeToggle = (nodeId) => {
    setExpandedNodes((prevExpandedNodes) =>
      prevExpandedNodes.includes(nodeId)
        ? prevExpandedNodes.filter((id) => id !== nodeId)
        : [...prevExpandedNodes, nodeId]
    );
  };

  const findNodeByName = (name, node) => {
    if (node.name === name) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeByName(name, child);
        if (found) return found;
      }
    }
    return null;
  };

  const addChild = (parentName, childNode) => {
    setWorkoutRoutine((prevWorkoutRoutine) => {
      const newWorkoutRoutine = JSON.parse(JSON.stringify(prevWorkoutRoutine));
      const parentNode = findNodeByName(parentName, newWorkoutRoutine);
      if (parentNode) {
        parentNode.children = parentNode.children || [];
        parentNode.children.push(childNode);
      }
      return newWorkoutRoutine;
    });
  };

  const removeChild = (parentName, childName) => {
    setWorkoutRoutine((prevWorkoutRoutine) => {
      const newWorkoutRoutine = JSON.parse(JSON.stringify(prevWorkoutRoutine));
      const parentNode = findNodeByName(parentName, newWorkoutRoutine);
      if (parentNode && parentNode.children) {
        parentNode.children = parentNode.children.filter(
          (child) => child.name !== childName
        );
      }
      return newWorkoutRoutine;
    });
  };

  return (
    <div className="container">
      <Sidebar onAddChild={addChild} onRemoveChild={removeChild} />
      <div className="treeWrapper">
        <Tree
          data={workoutRoutine}
          translate={{ x: 500, y: 50 }}
          zoomable={true}
          depthFactor={200}
          pathFunc={"diagonal"}
          orientation="vertical"
          collapsible={true}
          rootNodeClassName="treeWrapper__node-root"
          branchNodeClassName="treeWrapper__node-branch"
          leafNodeClassName="treeWrapper__node-leaf"
          separation={{ siblings: 2, nonSiblings: 2 }}
          onNodeToggle={onNodeToggle}
          initialDepth={expandedNodes.length ? undefined : 1}
          shouldCollapseNeighborNodes={false}
          expanded={expandedNodes}
        />
      </div>
    </div>
  );
};


export default TreeWrapper;
