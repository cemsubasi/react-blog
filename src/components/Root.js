import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import {
  HomeHeader,
  HomeBanner,
  HomeFeaturedPosts,
  HomeMainPosts,
  HomeFooter,
} from "./HomePage";
import { SuperList, SuperForm } from "./SuperPage";
import { PostCards } from "./PostsPage";
import { AlbumBody } from "./AlbumPage";
import { AboutBody } from "./AboutPage";
import { LoginBody } from "./LoginPage";
import parse from "html-react-parser";

import "../css/App.css";
import "../css/blog.css";

export function HomePage() {
  return (
    <div className="container">
      <HomeHeader />
      <HomeBanner />
      <HomeFeaturedPosts />
      <HomeMainPosts />
      <HomeFooter />
    </div>
  );
}
export function PostsPage() {
  return (
    <div className="container">
      <HomeHeader />
      <PostCards />
      <HomeFooter />
    </div>
  );
}
export function AboutPage() {
  return (
    <div className="container">
      <HomeHeader />
      <AboutBody />
      <HomeFooter />
    </div>
  );
}
export function AlbumPage() {
  return (
    <div className="container">
      <HomeHeader />
      <AlbumBody />
      <HomeFooter />
    </div>
  );
}
export function SuperPage() {
  return (
    <div className="container">
      <div className="superuser">
        <HomeHeader />
        <SuperList />
        <SuperForm />
        <HomeFooter />
      </div>
    </div>
  );
}
export function LoginPage() {
  return (
    <div className="container">
      <LoginBody />
    </div>
  );
}
export function DummyPage() {
  const context = useContext(BlogContext);
  let { slug } = useParams();
  const dummyObj = context.state.find((item) => item.postUrl === slug);
  return dummyObj !== undefined ? (
    <div className="container">
      <HomeHeader />
      <div className="container pt-4 m-auto p-5">
        <h2 className="text-center pb-4">{dummyObj.postHeader}</h2>
        <div>{parse(dummyObj.postBody)}</div>
        <p style={{ textAlign: "right", color: "#9FA4A7" }}>{dummyObj.date}</p>
      </div>
      <HomeFooter />
    </div>
  ) : null;
}
