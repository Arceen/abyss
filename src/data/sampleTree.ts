import CategoryTree from "../utils/CategoryTree";

const CategoryTreeSampleData = () => {
  // Creating all the Trees
  const root = new CategoryTree<string>(1, "Category jof sadfsfasdf");
  const child1 = new CategoryTree<string>(2, "Category 1");
  const child2 = new CategoryTree<string>(3, "Category 2");
  const subChild21 = new CategoryTree<string>(4, "Category 2.1");
  const subChild22 = new CategoryTree<string>(5, "Category 2.2");
  const child3 = new CategoryTree<string>(6, "Category 3");
  const subChild31 = new CategoryTree<string>(7,"Category 3.1");
  const subChild32 = new CategoryTree<string>(8,"Category 3.2");
  const subChild321 = new CategoryTree<string>(9,"Category 3.2.1");
  const subChild322 = new CategoryTree<string>(10,"Category 3.2.2");
  const subChild323 = new CategoryTree<string>(11, "Category 3.2.3");

  subChild32.addChildren([subChild321, subChild322, subChild323]);
  child3.addChildren([subChild31, subChild32]);
  child2.addChildren([subChild21, subChild22]);
  root.addChildren([child1, child2, child3]);
  return root;
};

export default CategoryTreeSampleData;
