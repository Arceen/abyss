// This is the Key Data Structure for the Data.
// We can parse it to render the tree
class CategoryTree<T> {
  value: T;
  uniqueKey: number;
  children: CategoryTree<T>[] = [];
  editMode: boolean;

  constructor(uniqueKey: number, value: T) {
    this.value = value;
    this.uniqueKey = uniqueKey;
    this.editMode = true;
  }

  addChild(child: CategoryTree<T>) {
    this.children.push(child);
  }

  addChildren(children: CategoryTree<T>[]) {
    for (let child of children) {
      this.addChild(child);
    }
  }
  attachChildByKey(child: CategoryTree<T>, parentKey: number) {
    let parentNode = this.findChild(parentKey);
    if (parentNode != null) {
      parentNode.addChild(child);
    }
  }

  alterEditModeByKey(key: number) {
    let editNode = this.findChild(key);
    if (editNode != null) {
      editNode.editMode = !editNode.editMode;
    }
  }

  deleteNodeByKey(key: number) {
    if (this.uniqueKey === key) return this;
    let queue: CategoryTree<T>[] = [this];
    while (queue.length > 0) {
      const currentNode = queue.pop();

      if (!currentNode) {
        continue;
      }

      const index = currentNode.children.findIndex(
        (node) => node.uniqueKey === key,
      );

      if (index !== -1) {
        currentNode.children.splice(index, 1);
        return this;
      }
      for (let node of currentNode.children) {
        queue.push(node);
      }
    }
    return this;
  }

  findChild(key: number) {
    if (this.uniqueKey === key) return this;
    let queue: CategoryTree<T>[] = [this];
    while (queue.length > 0) {
      const currentNode = queue.pop();
      for (let node of currentNode!.children) {
        if (node.uniqueKey === key) {
          return node;
        } else {
          queue.push(node);
        }
      }
    }
    return null;
  }
}
export default CategoryTree;
