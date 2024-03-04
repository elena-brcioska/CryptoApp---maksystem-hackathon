import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import CoinList, { loader as coinsLoader } from "./pages/CoinList/CoinList";
import Auth, { action } from "./pages/Auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./util/ProtectedRoute";
import AssetPlatforms, { loader as platformLoader } from "./pages/AssetPlatform/AssetPlatforms";
import MyCoins from "./pages/MyCoins/MyCoins";
import { MyCoinsProvider } from "./context/MyCoinsContext";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      {
        index: true,
        element: <ProtectedRoute><Home /></ProtectedRoute>,
        loader: coinsLoader,
      },
      {
        path: "access",
        element: <Auth />,
        action: action,
      },
      {
        path: "platforms",
        element: <ProtectedRoute><AssetPlatforms /></ProtectedRoute>,
        loader: platformLoader,
      },
      {
        path: "coins",
        element: <ProtectedRoute><CoinList /></ProtectedRoute>,
        loader: coinsLoader,
      },
      {
        path: "mycoins",
        element: <ProtectedRoute><MyCoins /></ProtectedRoute>,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <MyCoinsProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </MyCoinsProvider>
  );
}

export default App;
