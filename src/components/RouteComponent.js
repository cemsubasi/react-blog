import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  HomePage,
  PostsPage,
  AlbumPage,
  AboutPage,
  SuperPage,
  LoginPage,
  DummyPage,
} from "./Root";
import { superUrl } from "../Data";
import { BlogContext } from "../contexts/BlogContext";
import "../css/App.css";
import "../css/blog.css";

export function RouteComponent() {
  const context = useContext(BlogContext);
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" children={<HomePage />} />
          <Route path="/posts" children={<PostsPage />} />
          <Route path="/album" children={<AlbumPage />} />
          <Route path="/about" children={<AboutPage />} />
          <Route
            path={superUrl}
            render={() =>
              context.isAdmin === true ? <SuperPage /> : <LoginPage />
            }
          />
          <Route path="/:slug" children={<DummyPage />} />
        </Switch>
      </div>
    </Router>
  );
}
