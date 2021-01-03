import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import "../App.css";
import "../blog.css";
import { dateParsed } from "../Data";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect } from "react";

export function SuperList() {
  const context = useContext(BlogContext);

  return (
    <div className="container">
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Url</th>
            <th scope="col">Header</th>
            <th scope="col">Date</th>
            <th scope="col">Star</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {context.state.map((user, index) => (
            <tr key={user.postUrl}>
              <th scope="row">{index}</th>
              <td>
                <Link to={`/${user.postUrl}`}>{user.postUrl}</Link>
              </td>
              <td>{user.postHeader}</td>
              <td>{user.date}</td>
              <td>
                <button
                  className={
                    user.featured
                      ? "btn btn-outline-success btn-sm"
                      : "btn btn-outline-dark btn-sm"
                  }
                  onClick={() => context.setFeaturedPost(user)}>
                  {user.featured ? "Pull" : "Push"}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => {
                    context.deletePost(user);
                  }}>
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function SuperForm() {
  const context = useContext(BlogContext);

  const Submit = () => {
    if (inputState.postUrl === "" || inputState.postUrl.includes(" "))
      return context.errStateHandler(1);
    else {
      return context.setStateHandler(inputState, inputStateClear);
    }
  };

  const [text, setText] = useState("");
  const [inputState, setInputState] = useState({
    id: Date.now(),
    postUrl: "",
    postHeader: "",
    author: "",
    category: "",
    date: dateParsed,
    featured: false,
    comments: [],
  });
  useEffect(
    () => setInputState({ ...inputState, postBody: text }),
    // eslint-disable-next-line
    [text]
  );

  const inputStateHandler = (e) =>
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  const inputStateClear = () =>
    setInputState({
      id: "",
      postUrl: "",
      postHeader: "",
      author: "",
      category: "",
      date: dateParsed,
      featured: false,
      comments: [],
    });
  console.log(inputState);
  return (
    <div className="container">
      {(() => {
        switch (context.errState) {
          case 0:
            return (
              <div className="alert alert-success" role="alert">
                Post has been sent successfuly!
              </div>
            );
          case 1:
            return (
              <div className="alert alert-danger" role="alert">
                Post Url must be unique and cannot include blank or special
                charachters! — check it out!
              </div>
            );
          case 2:
            return (
              <div className="alert alert-success" role="alert">
                Post was deleted successfuly!
              </div>
            );
          default:
            return null;
        }
      })()}

      <div className="row m-2auto">
        <div className="col-6 p-2">
          <label className="form-label">Post Url</label>
          <input
            type="text"
            className="form-control"
            name="postUrl"
            value={inputState.postUrl}
            onChange={(e) => inputStateHandler(e)}
            id="exampleFormControlInput1"
            placeholder="Post Url  ( Must Fill )"
          />
        </div>
        <div className="col-6 p-2">
          <label className="form-label">Post Header</label>
          <input
            type="text"
            className="form-control"
            name="postHeader"
            value={inputState.postHeader}
            onChange={inputStateHandler}
            id="exampleFormControlInput1"
            placeholder="Post Header"
          />
        </div>
      </div>
      <div className="row m-2auto">
        <div className="col-6 p-2">
          <label className="form-label">Post Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={inputState.author}
            onChange={inputStateHandler}
            id="exampleFormControlInput1"
            placeholder="Author"
          />
        </div>
        <div className="col-6 p-2">
          <label className="form-label">Post Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={inputState.category}
            onChange={inputStateHandler}
            id="exampleFormControlInput1"
            placeholder="Category"
          />
        </div>
      </div>

      <div className="editor mb-3 m-2auto">
        <CKEditor
          editor={ClassicEditor}
          name="postBody"
          value={text}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
          id="exampleFormControlTextarea1"
          rows="3"
        />
      </div>
      {/*
      // <div className="mb-3 m-2auto">
      //   <label className="form-label">Post Body</label>
      //   <textarea
      //     className="form-control"
      //     name="postBody"
      //     value={inputState.postBody}
      //     onChange={inputStateHandler}
      //     id="exampleFormControlTextarea1"
      //     rows="3"></textarea>
      // </div>
     */}

      <div className="my-3">
        <button className="btn btn-outline-dark mb-3" onClick={Submit}>
          Add Post
        </button>
      </div>
    </div>
  );
}
