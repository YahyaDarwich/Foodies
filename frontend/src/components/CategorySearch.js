import React from "react";
import "./CategorySearch.css";
import axios from "axios";

class CategorySearch extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      id: undefined,
      search: undefined,
      category: undefined,
    };
    this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/categories`).then((res) => {
      const categories = res.data;
      //console.log(categories.response[0].category);
      this.setState({ categories: categories.response });
      console.log(this.state.categories);
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.search) {
      axios
        .get(`/api/recipes/title/${this.state.search}`)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            const searchByTitle = document.getElementById("searchByTitle");
            searchByTitle.value = "";
            this.setState({ search: undefined });
            const byCategory = document.getElementById("byCategory");
            byCategory.value = "Choose food category";
          }
          this.props.setStateOfParent(res.data.response);
        })
        .catch((err) => console.log("this food title not shown in database"));
    }
    if (this.state.category === "All") {
      axios
        .get(`/api/recipes/`)
        .then((res) => {
          console.log(res.data);
          this.props.setStateOfParent(res.data.response);
          this.setState({ category: undefined });
        })
        .catch((err) => console.log(err.message));
    } else {
      axios
        .get(
          `/api/recipes/category/${this.state.category}`
        )
        .then((res) => {
          console.log(res.data);
          this.props.setStateOfParent(res.data.response);
          this.setState({ category: undefined });
        })
        .catch((err) => console.log("cannot find the id of category"));
    }
  };

  render() {
    return (
      <>
        <div className="category_search_box container">
          <form className="category_search_form" onSubmit={this.handleSubmit}>
            <label>
              <p>Category:</p>
              <select
                className="category__select"
                name="category"
                type="submit"
                id="byCategory"
                onChange={async (e) => {
                  await this.handleChange(e);
                  this.handleSubmit(e);
                }}
              >
                <option selected hidden>
                  Choose food category
                </option>
                <option value={"All"}>All</option>
                {this.state.categories.map((category, index) => {
                  return (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              <input
                type="text"
                placeholder="Search.."
                name="search"
                id="searchByTitle"
                className="search__bar"
                onChange={this.handleChange}
              />
              <button type="submit" className="search__btn">
                Search
              </button>
            </label>
          </form>
        </div>
      </>
    );
  }
}

export default CategorySearch;
