import { useState, useEffect } from "react";
import axios from "axios";
import { BlogContext } from "./contexts/BlogContext";
import { RouteComponent } from "./components/RouteComponent";
import { url, url2 } from './Data';
import "./css/App.css";
import "./css/blog.css";

export default function App() {
  const [state, setState] = useState([]);
  useEffect(
    () =>
      axios
        .get(url)
    .then((res) => {
      setState(res.data)})
        .catch((err) => console.log(err))
      ,[]
  );

  //pageState contains homepage main post number 
  //it starts with 2 and increase when the older button clicked
  const [pageState, setPageState] = useState(2);
  const pageStateHandler = () => {
    setPageState(() => (state.length > pageState ? pageState + 1 : pageState));
  };
  //this state contains homepage main post objects
  //starts with number of init pageState and if pageState increases then stateMainPage takes
  //that much object from the state
  const [stateMainPage, setStateMainPage] = useState([]);
  const pagingHandler = () => {
    setStateMainPage(state.filter((item, index) => index < pageState));
  };
  useEffect(
    pagingHandler
    ,
    // eslint-disable-next-line
    [state, pageState]
  );

  // errState initialize with -1 meaning it doesnt show any alert
  // i didnt move it to SuperPage cuz maybe i'll use it later in another component
  const [errState, setErrState] = useState(-1);
  const errStateHandler = (arg) => setErrState(()=>{
    // post sent successfuly
    if(arg === 0){
        setTimeout(()=>setErrState(-1), 3000);
        return 0;
    }
    // post didnt send
    if(arg === 1){
      setTimeout(()=>setErrState(-1), 3000);
      return 1;
    }
    // post deleted successfuly
    if(arg === 2){
      setTimeout(()=>setErrState(-1), 3000);
      return 2;
    }
  });
  const setStateHandler = (inputState, inputStateClear) => {
    // it looks for is postUrl unique also does include blank or empty
    if (state.some((user) => user.postUrl === inputState.postUrl) || inputState.postUrl === "" || inputState.postUrl.includes(" "))
     {
      errStateHandler(1);
    } else {
      setState([
        ...state,
        {
          ...inputState
        },
      ]);
      inputStateClear();
      errStateHandler(0);
      axios
        .post(url2, inputState)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  };

  const setFeaturedPost = (arg) =>
  {
    setState(
      state.map((item) =>
        item.postUrl === arg.postUrl
          ? { ...item, featured: !item.featured }
          : { ...item }
      )
    )
    axios
      .put(url2, {postUrl: arg.postUrl, featured: !(arg.featured)}
      )
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  const deletePost = (arg) => {
    setState(state.filter((item) => item.postUrl !== arg.postUrl));
    axios
      .delete(url2, {
        data :{postUrl: arg.postUrl}
      })
      .then(res => console.log(res))
      .catch(err => console.log('xxx'))
    errStateHandler(2);
  }

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
