import "./App.css";
import * as ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import CoinList, { loader as coinsLoader } from "./pages/CoinList/CoinList";
import Auth, { action } from "./pages/Auth/Auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    action: action,
    children: [
      {
        index: true,
        element: <CoinList />,
        loader: coinsLoader,
        
      },
      {
        path: "access",
        element: <Auth />,
      },
      {
        path: "coins",
        element: <CoinList />,
        loader: coinsLoader,
        
      },
    ]
  },
]);

function App() {
return(
<>
<RouterProvider router={router} />
<ToastContainer />
</>)
}

export default App;
