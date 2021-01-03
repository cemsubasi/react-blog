import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import parse from "html-react-parser";
import "../App.css";
import "../blog.css";

export function PostCards() {
  const context = useContext(BlogContext);
  return (
    <div className="container row">
      <div className="row row-cols-1 row-cols-lg-2">
        {context.state.map((user) => (
          <div key={user.postUrl} className="my-4 col ">
            <div className="card text-center">
              <div className="card-header">
                <h2>{user.postHeader}</h2>
              </div>
              <div className="card-body">
                <div className="card-text">
                  {user.postBody.length > 200
                    ? parse(user.postBody.slice(0, 200) + " ...")
                    : parse(user.postBody)}
                </div>
                <Link to={`${user.postUrl}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
              <div className="card-footer text-muted">{user.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
