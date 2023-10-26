import "../styles/components/categoryTree.css";
import CategoryTree from "../utils/CategoryTree";
// Pre loaded data for css use;
// import CategoryTreeSampleData from "../data/sampleTree";

import { getRandomColor } from "../utils/functions";

// Icons for use;
import del from "../images/cross.png";
import edit from "../images/edit.png";
import add from "../images/plus.png";
import confirm from "../images/correct.png";
import { useState } from "react";

//Basically use the 3 values from the task videos given
// And randomly generate the numbers with high contrast for other things.
let colorList = ["#fff", "#fd9c76", "#1fb1d7"];

// const sampleData: CategoryTree<string> = CategoryTreeSampleData();

interface CategoryTreeProps {
  baseTitle: string;
}

type NodeOpeartion = "ADD" | "EDIT" | "DELETE";

type CategoryTreeInitial = {
  value: string;
  children: CategoryTree<string>[];
  uniqueKey: number;
  addChild: (child: CategoryTree<string>) => void;
  addChildren: (children: CategoryTree<string>[]) => void;
  attachChildByKey: (child: CategoryTree<string>, parentKey: number) => void;
  alterEditModeByKey: (key: number) => void;
  deleteNodeByKey: (key: number) => CategoryTree<string>;
};

const CategoryTreeComponent = ({ baseTitle: title }: CategoryTreeProps) => {
  // Root Tree
  const [treeData, setTreeData] = useState<CategoryTreeInitial>(
    new CategoryTree<string>(0, title),
  );
  // Key to identify nodes
  const [currentKey, setNextKey] = useState<number>(1);
  // Check if one node is being edited, if so, block all operations
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(false);
  // Store the previous value of a node
  const [previousValue, setPreviousValue] = useState("");

  // These will do the operations of the nodes based on
  const onTreeChanged = (
    operation: NodeOpeartion,
    node: CategoryTree<string>,
  ) => {
    if (operation === "ADD") {
      if (isCurrentlyEditing) {
        alert("Please Confirm the Edits");
        return;
      }
      // Create new child based on key and update keys and tree
      const newChild = new CategoryTree<string>(currentKey, "");
      treeData.attachChildByKey(newChild, node.uniqueKey);
      setTreeData(treeData);
      setNextKey(currentKey + 1);
      setIsCurrentlyEditing(true);
    } else if (operation === "DELETE") {
      if (isCurrentlyEditing) {
        alert("Please Confirme the Edits");
        return;
      }

      // delete child based on key and update tree
      const newTreeData = treeData.deleteNodeByKey(node.uniqueKey);
      setTreeData(newTreeData);
      setNextKey(currentKey + 1);
    } else if (operation === "EDIT") {
      if (node.value === "") {
        alert("Please enter non-empty Category");
        return;
      }
      // This does 2 things
      // It alters edit and can cancel edits as well
      // Force re-render on edit
      if (node.editMode) {
        setPreviousValue("");
      } else {
        setPreviousValue(node.value);
      }
      treeData.alterEditModeByKey(node.uniqueKey);
      setTreeData(treeData);
      setNextKey(currentKey + 1);
      setIsCurrentlyEditing(false);
    }
  };

  const renderTree = (treeData: CategoryTree<string>) => {
    // I'll render each node in a tree as a child or a root (Base case)
    // Use DFS to construct & render
    // Again using an inital rootColor as the first color
    // The other ones will be randomly generated
    const renderedTree = traverseTree(treeData, 1);
    return renderedTree;
  };
  const handleNodeValueChanged = (
    root: CategoryTree<string>,
    newValue: string,
  ) => {
    root.value = newValue;
    setTreeData(treeData);
    setNextKey(currentKey + 1);
  };

  const handleNodeValueDiscarded = (root: CategoryTree<string>) => {
    if (previousValue === "") {
      alert("Enter A Category Name");
      return;
    }
    //reset to previous value
    root.editMode = false;
    handleNodeValueChanged(root, previousValue);
    setPreviousValue("");
    setIsCurrentlyEditing(false);
  };

  const traverseTree = (root: CategoryTree<string>, level: number) => {
    if (level > colorList.length) {
      colorList.push(getRandomColor({ minVal: 70, maxVal: 160 }));
    }
    return (
      //use keys to force re-render
      <div key={root.uniqueKey} className={level === 1 ? "root" : "child"}>
        <div
          className="item"
          style={{
            backgroundColor: root.editMode ? "#fff" : colorList[level - 1],
          }}
        >
          <input
            className="val"
            value={root.value}
            disabled={!root.editMode}
            placeholder={"Category Name"}
            onChange={(e) => {
              handleNodeValueChanged(root, e.target.value);
            }}
            style={{
              color: root.editMode ? "black" : "white",
            }}
            autoFocus={level !== 1 && root.editMode}
          />
          <div className="controls">
            {level !== 1 && root.editMode && (
              <>
                <img
                  className="confirm-icon"
                  src={confirm}
                  onClick={() => {
                    onTreeChanged("EDIT", root);
                  }}
                  alt="confirm icon"
                />
              </>
            )}
            {(level === 1 || !root.editMode) && (
              <>
                <img
                  className="add-icon"
                  src={add}
                  onClick={() => {
                    onTreeChanged("ADD", root);
                  }}
                  alt="add icon"
                />
                {level !== 1 && (
                  <img
                    className="edit-icon"
                    src={edit}
                    onClick={() => {
                      onTreeChanged("EDIT", root);
                    }}
                    alt="cross icon"
                  />
                )}
              </>
            )}
            {level !== 1 && (
              <img
                className="delete-icon"
                src={del}
                onClick={() => {
                  if (root.editMode) {
                    handleNodeValueDiscarded(root);
                  } else {
                    onTreeChanged("DELETE", root);
                  }
                }}
                alt="delete icon"
              />
            )}
          </div>
        </div>
        {Array.isArray(root.children) && root.children.length > 0 && (
          <div className="children">
            {root.children.map((node) => {
              return <>{traverseTree(node, level + 1)}</>;
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tree-container">
      {renderTree(treeData as CategoryTree<string>)}
    </div>
  );
};

export default CategoryTreeComponent;
