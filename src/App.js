import { useState, useEffect } from "react";
import axios from "axios";
import { BlogContext } from "./contexts/BlogContext";
import { RouteComponent } from "./components/RouteComponent";
import { url, url2 } from "./Data";
import "./App.css";
import "./blog.css";

export default function App() {
  const [state, setState] = useState([]);
  useEffect(
    () =>
      axios
        .get(url)
        .then((res) => {
          setState(res.data);
        })
        .catch((err) => console.log(err)),
    []
  );
  const [pageState, setPageState] = useState(2);
  const pageStateHandler = () => {
    setPageState(() => (state.length > pageState ? pageState + 1 : pageState));
  };
  const [stateMainPage, setStateMainPage] = useState([]);
  const pagingHandler = () => {
    setStateMainPage(state.filter((item, index) => index < pageState));
  };
  useEffect(
    pagingHandler,
    // eslint-disable-next-line
    [state, pageState]
  );

  const [errState, setErrState] = useState(-1);
  const errStateHandler = (arg) =>
    setErrState(() => {
      if (arg === 0) {
        setTimeout(() => setErrState(-1), 3000);
        return 0;
      }
      if (arg === 1) {
        setTimeout(() => setErrState(-1), 3000);
        return 1;
      }
      if (arg === 2) {
        setTimeout(() => setErrState(-1), 3000);
        return 2;
      }
    });
  const setStateHandler = (inputState, inputStateClear) => {
    if (state.every((user) => user.postUrl !== inputState.postUrl)) {
      setState([
        ...state,
        {
          ...inputState,
        },
      ]);
      inputStateClear();
      errStateHandler(0);
      axios
        .post(url2, inputState)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else errStateHandler(1);
  };
  const setFeaturedPost = (arg) => {
    setState(
      state.map((item) =>
        item.postUrl === arg.postUrl
          ? { ...item, featured: !item.featured }
          : { ...item }
      )
    );

    axios
      .put(url2, { postUrl: arg.postUrl, featured: !arg.featured })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const deletePost = (arg) => {
    setState(state.filter((item) => item.postUrl !== arg.postUrl));
    axios
      .delete(url2, {
        data: { postUrl: arg.postUrl },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("xxx"));
    errStateHandler(2);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <BlogContext.Provider
      value={{
        state,
        errState,
        pageState,
        stateMainPage,
        isAdmin,
        deletePost,
        setFeaturedPost,
        setStateHandler,
        pageStateHandler,
        pagingHandler,
        errStateHandler,
        setIsAdmin,
      }}>
      <RouteComponent />
    </BlogContext.Provider>
  );
}
