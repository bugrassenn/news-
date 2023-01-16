import React from "react";
import AddNews from "./components/AddNews.js";
import NewsList from "./components/NewsList";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import SignIn from "./components/SignIn";
import Detail from "./components/Detail.js";

class App extends React.Component {
  state = {
    news: [],
  };

  // componentDidMount olduğun anda fake apiden veriyi çekmesini söylüyoruz axios ile veri çekme işlemi
  async componentDidMount() {
    const response = await axios.get("http://localhost:3002/news");
    this.setState({ news: response.data });
  }

  // axios.delete metodu ile fake apiden seçilen iddeki siliyoruz
  deleteNew = async (tidings) => {
    // silinecek haberin id si yardımı ile idsini silerek yeni listeyi oluşturuyoruz
    axios.delete(`http://localhost:3002/news/${tidings.id}`);
    const newNewsList = this.state.news.filter((n) => n.id !== tidings.id);

    this.setState({
      news: newNewsList, // eski statemizi yeni haliyle değiştiriyoruz.
    });
  };

  // fake apiye axios.post metodu ile yeni eleman ekleme

  addNews = async (tidings) => {
    await axios.post(`http://localhost:3002/news/`, tidings);
    this.setState((state) => ({
      news: state.news.concat([tidings]),
    }));
  };

  render() {
    return (
      <>
        <nav>
          <Navbar />
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <div className="row">
                  <div className="col-lg-12"></div>
                </div>
                <NewsList news={this.state.news} deleteNew={this.deleteNew} />
              </div>
            }
          />
          <Route
            path="/add"
            element={
              <AddNews
                onAddNews={(news) => {
                  this.addNews(news);
                }}
              />
            }
          />
          <Route path="/signIn" element={<SignIn />} />
          <Route
            path="/detail/:id"
            element={<Detail news={this.state.news} />}
          />
          <Route path="/admin" element={<SignIn />} />
        </Routes>
      </>
    );
  }
}

export default App;
