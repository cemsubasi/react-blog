import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import parse from "html-react-parser";
import logo from "../logo.svg";
import "../App.css";
import "../blog.css";

export function HomeHeader() {
  return (
    <div className="container">
      {/* Bootstrap Navbar */}
      <div>
        <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <Link to="/posts" className="link-secondary" aria-label="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mx-3"
                  role="img"
                  viewBox="0 0 24 24">
                  <title>Search</title>
                  <circle cx="10.5" cy="10.5" r="7.5" />
                  <path d="M21 21l-5.2-5.2" />
                </svg>
              </Link>
            </div>
            <div className="col-4 text-center">
              <Link
                to="/"
                className="blog-header-logo text-dark d-none d-sm-block">
                3hree1ne
              </Link>
              <Link to="/" className="blog-header-logo text-dark ">
                <div className="d-sm-none" style={{ fontSize: "20px" }}>
                  3hree1ne
                </div>
              </Link>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <button className="btn btn-sm btn-outline-secondary" disabled>
                Subscribe
              </button>
            </div>
          </div>
        </header>
        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content-between">
            <Link to="/" className="p-2 link-secondary">
              Home
            </Link>
            <Link to="/posts" className="p-2 link-secondary">
              Posts
            </Link>
            <Link to="/album" className="p-2 link-secondary">
              Album
            </Link>
            <Link to="/about" className="p-2 link-secondary">
              About
            </Link>
            <Link to="/about" className="p-2 link-secondary">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
export function HomeBanner() {
  return (
    <div className="container">
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">Greetings!</h1>
          <p className="lead my-3">
            A Simple Blog Developed By Cem Subasi Via React
          </p>
        </div>
      </div>
    </div>
  );
}
export function HomeFeaturedPosts() {
  const context = useContext(BlogContext);
  return (
    <div className="container">
      <div className="row mb-2">
        {context.state.map((item) =>
          item.featured ? (
            <div className="col-md-6" key={item.postUrl}>
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-success">
                    {item.category}
                  </strong>
                  <h3 className="mb-0">{item.postHeader}</h3>
                  <div className="mb-1 text-muted">{item.date}</div>
                  <div className="card-text mb-auto">
                    {item.postBody.length > 80
                      ? parse(item.postBody.slice(0, 70) + " ...")
                      : parse(item.postBody)}
                  </div>
                  <Link to={`/${item.postUrl}`} className="stretched-link">
                    Continue reading
                  </Link>
                </div>
                <div className="col-auto d-none d-lg-block">
                  <img
                    src={logo}
                    className="bd-placeholder-img"
                    width="200"
                    height="250"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
export function HomeMainPosts() {
  const context = useContext(BlogContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h3 className="pb-4 mb-4 font-italic border-bottom">
            With love from the 31
          </h3>

          {context.stateMainPage.map((item) => (
            <div className="blog-post" key={item.postUrl}>
              <h2 className="blog-post-title">
                <Link to={`/${item.postUrl}`}>{item.postHeader}</Link>
              </h2>
              <p className="blog-post-meta">
                {item.date} by <Link to="/about">{item.author}</Link>
              </p>
              <div>{parse(item.postBody)}</div>
            </div>
          ))}
          <nav className="blog-pagination" aria-label="Pagination">
            <button
              className="btn btn-outline-primary"
              onClick={context.pageStateHandler}>
              Older
            </button>
            <a
              className="btn btn-outline-secondary disabled"
              href="/"
              tabIndex="-1"
              aria-disabled="true">
              Random
            </a>
          </nav>
        </div>
        <div className="col-md-4">
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="font-italic">About</h4>
            <p className="mb-0">
              Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
              mattis consectetur purus sit amet fermentum. Aenean lacinia
              bibendum nulla sed consectetur.
            </p>
          </div>

          <div className="p-4">
            <h4 className="font-italic">Archives</h4>
            <ol className="list-unstyled mb-0">
              <li>
                <a href="/">January 2021</a>
              </li>
              <li>
                <a href="/">December 2020</a>
              </li>
              <li>
                <a href="/">November 2020</a>
              </li>
              <li>
                <a href="/">October 2020</a>
              </li>
            </ol>
          </div>
          <div className="p-4">
            <h4 className="font-italic">Elsewhere</h4>
            <ol className="list-unstyled">
              <li>
                <a href="https://www.github.com/cemsubasi" target="_alt">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/cemsubasi/" target="_alt">
                  Instagram
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
export function HomeFooter() {
  return (
    <div className="container">
      <div className="blog-footer">
        <p>
          {/*eslint-disable-next-line*/}
          <a href="#">Back to top</a>
        </p>
      </div>
    </div>
  );
}
