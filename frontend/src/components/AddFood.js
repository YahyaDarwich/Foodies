import React from "react";
import axios from "axios";
import "./AddFood.css";
import foodImg from "../images/3F96489656E045C495843A0313B64158.png";
class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstName: undefined,
      userLastName: undefined,
      title: undefined,
      ingredient: [],
      name: undefined,
      quantity: undefined,
      unit: undefined,
      category: undefined,
      categories: undefined,
      file: undefined,
      idImg: undefined,
    };
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
  handleChangePhoto = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  ingredientSubmit = (event) => {
    event.preventDefault();
    this.setState({
      ingredient: [
        ...this.state.ingredient,
        {
          name: this.state.name,
          quantity: this.state.quantity,
          unit: this.state.unit,
        },
      ],
    });
    const ing = document.getElementById("ing");
    const quantity = document.getElementById("quantity");
    const unit = document.getElementById("unit");
    ing.value = "";
    quantity.value = "";
    unit.value = "Choose Unit";
    document.getElementById("ingAdded").innerHTML += this.state.name+", ";
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    console.warn(this.state.file);
    let url = "/api/files/upload";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.response._id);
        this.setState({ idImg: res.data.response._id });
        console.log("imd id" + this.state.idImg);
      })
      .then(() => {
        axios
          .post(`/api/recipes`, {
            userFirstName: this.state.userFirstName,
            userLastName: this.state.userLastName,
            title: this.state.title,
            ingredient: this.state.ingredient,
            category: this.state.category,
            image: this.state.idImg,
          })
          .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
              const first = document.getElementById("first");
              const last = document.getElementById("last");
              const title = document.getElementById("title");
              const category = document.getElementById("category");
              first.value = "";
              last.value = "";
              title.value = "";
              category.value = "Choose food category";
              window.location.reload();
            }
          });
      });
  };

  render() {
    return (
      this.props.model && (
        <div className="popup-box">
          <div className="box">
            <form
              onSubmit={this.handleSubmit}
              id="mainForm"
              enctype="multipart/form-data"
            ></form>
            <div className="box_content">
              <span>Add your food</span>
              <div className="username-info">
                <div className="input-box firstname-box">
                  <input
                    type="text"
                    required
                    id="first"
                    name="userFirstName"
                    form="mainForm"
                    onChange={this.handleChange}
                  />
                  <label>FirstName</label>
                </div>
                <div className="input-box lastname-box">
                  <input
                    type="text"
                    required
                    id="last"
                    name="userLastName"
                    form="mainForm"
                    onChange={this.handleChange}
                  />
                  <label>LastName</label>
                </div>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  required
                  id="title"
                  name="title"
                  form="mainForm"
                  onChange={this.handleChange}
                />
                <label>Enter the title of food</label>
              </div>
              <form onSubmit={this.ingredientSubmit} id="ingredientForm"></form>
              <div className="ingredient-info">
                <div className="input-box ingredient">
                  <input
                    type="text"
                    required
                    id="ing"
                    name="name"
                    form="ingredientForm"
                    onChange={this.handleChange}
                  />
                  <label>Add Ingredients</label>
                  <button
                    className="ingredient-btn"
                    type="submit"
                    form="ingredientForm"
                  >
                    Add
                  </button>
                </div>
                <div className="input-box quantity-box">
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    id="quantity"
                    name="quantity"
                    form="ingredientForm"
                    onChange={this.handleChange}
                  />
                  <label>Quantity</label>
                </div>
                <div className="unit-box">
                  <select
                    className="unit--select"
                    required
                    name="unit"
                    id="unit"
                    form="ingredientForm"
                    onChange={this.handleChange}
                  >
                    <option selected hidden>
                      Choose Unit
                    </option>
                    <option>piece</option>
                    <option>cup</option>
                    <option>spoon</option>
                    <option>gram</option>
                    <option>ml</option>
                  </select>
                </div>
              </div>
              <div className="category--food">
                <p>Category:</p>
                <select
                  className="category--select"
                  form="mainForm"
                  name="category"
                  id="category"
                  onChange={this.handleChange}
                  required
                >
                  <option selected hidden>
                    Choose food category
                  </option>
                  {this.state.categories.map((category, index) => {
                    return (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="file-box">
                <label>Choose your photo:</label>
                <input
                  type="file"
                  name="file"
                  form="mainForm"
                  required
                  onChange={this.handleChangePhoto}
                />
              </div>
              <div id="ingAdded" className="ingAdded"></div>
              <div className="buttons">
                <button
                  className="close-btn"
                  onClick={() => this.props.setModel(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" form="mainForm">
                  Publish
                </button>
              </div>
            </div>
            <div className="box_img">
              <img src={foodImg} alt="best food" />
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Popup;
