import { useEffect, useState } from "react";
import categoryApi from "../../api/categoryApi";

function CreateCategory() {
  const [categorys, setCategorys] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryRank, setCategoryRank] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const loadCategory = () => {
    categoryApi
      .getAllCategory()
      .then((res) => setCategorys(res))
      .catch((error) => console.log("fail categoryApi", error));
  };
  useEffect(() => {
    loadCategory();
  }, []);

  const handleSubmit = () => {
    const payload = {
      name: categoryName,
      rank: categoryRank,
    };
    // call api
    categoryApi.createCategory(payload).then((res) => {
      loadCategory();
    });
  };
  const handleUpdate = () => {
    const payload = {
      name: categoryName,
      rank: categoryRank,
    };

    categoryApi.updateCategory(categoryId, payload).then((res) => {
      loadCategory();
    });
  };
  const handleDelete = () => {
    categoryApi.deleteCategory(categoryId).then((res) => {
      loadCategory();
    });
  };

  return (
    <div className="container mt-3">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID Category</th>
            <th>Name Category</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {categorys.map((category) => (
            <tr
              key={category.id}
              onClick={() => {
                setCategoryName(category.name);
                setCategoryRank(category.rank);
                setCategoryId(category.id);
              }}
            >
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-3 mt-3">
        <label htmlFor="txtNameCategory">Name Category:</label>
        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="form-control"
          id="txtNameCategory"
          placeholder="Enter name category"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="txtRank">Rank:</label>
        <input
          value={categoryRank}
          onChange={(e) => setCategoryRank(e.target.value)}
          className="form-control"
          id="txtRank"
          placeholder="Enter rank"
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{ marginRight: 30 }}
        className="btn btn-primary"
      >
        Thêm Mới
      </button>
      <button
        onClick={handleUpdate}
        style={{ marginRight: 30 }}
        className="btn btn-primary"
      >
        Sửa
      </button>
      <button onClick={handleDelete} className="btn btn-primary">
        Xoá
      </button>
    </div>
  );
}
export default CreateCategory;
