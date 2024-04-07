import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import PreventSigninRoute from "./utils/PreventSiginRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBarLayout from "./utils/NavBarLayout";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import DnsRecords from "./Pages/DnsRecords";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
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
          theme="light"
        />
        <Routes>
          <Route path="/" element={<PreventSigninRoute />}>
            <Route path="/" element={<Login />} />
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route element={<NavBarLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dns" element={<DnsRecords />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
