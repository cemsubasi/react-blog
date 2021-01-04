import React from "react";
import "../css/App.css";
import "../css/blog.css";
import pp from "../img/pp.svg";

export function AboutBody() {
  return (
    <div className="container">
      <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
        <div className="my-3 py-3 text-dark ">
          <img
            className="mb-4 rounded-circle"
            id="profilePic"
            src={pp}
            alt=""
            width="220"
            height="220"
            style={{ border: "2px solid white" }}
          />
          <h2 className="display-5">About</h2>
          <p className="lead">Cem Subasi</p>
        </div>
        <div
          className="bg-dark shadow-sm mx-auto"
          style={{
            width: "80%",
            height: "auto",
            borderRadius: "21px 21px 0 0",
          }}>
          <h5 className="p-5 m-0auto">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et
            elit non elit pharetra molestie et in arcu. Duis varius cursus nulla
            at porttitor. Praesent molestie aliquam lacus, porta ullamcorper
            odio venenatis sed. Etiam scelerisque sagittis lorem et eleifend.
            Nunc congue bibendum nulla dictum aliquam. Aenean quis dui lacinia,
            cursus urna sit amet, pretium odio. Vivamus sollicitudin dapibus
            sapien vel euismod. Quisque tincidunt quis justo at ultricies.
            Suspendisse vestibulum purus commodo lectus bibendum molestie at non
            lacus. Curabitur a pretium nulla, ut dignissim justo. Fusce volutpat
            suscipit massa a posuere. Proin orci est, dapibus venenatis
            fermentum quis, luctus mattis lacus. Donec eu aliquam nisl. Maecenas
            viverra vel eros quis feugiat. Suspendisse commodo sed nisi ut
            egestas. Aenean tempus, ligula ut interdum lobortis, nisi odio
            vulputate nibh, eget imperdiet quam odio vehicula massa.{" "}
          </h5>
        </div>
      </div>
    </div>
  );
}
