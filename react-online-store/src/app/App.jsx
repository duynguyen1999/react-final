import React, { useEffect } from "react"
import Router from "./routers/router"
import { ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux";
import { logIn } from "./store/actions/auth-action";
import { useSelector } from "react-redux";



function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.auth.isLoadAuthFromLs);


  //load auth data from ls
  useEffect(() => {
    const userData = localStorage.getItem("user_infomation");

    if (userData !== "") {
      dispatch(logIn(JSON.parse(userData)));
    } else {
      dispatch(logIn({}));
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      {!isLoading && <Router></Router>}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  )
}

export default App
