import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "../pages/Login";
import GuestLayout from "./layouts/GuestLayout";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import OverviewTab from "../pages/dashboard/OverviewTab";
import UsersTab from "../pages/dashboard/UsersTab";
import ProductsTab from "../pages/dashboard/ProductsTab";
import AuthorizedLayout from "./layouts/AuthorizedLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/products",
				element: <Products />,
			},
			{
				path: "/product/:id",
				element: <Product />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},

	{
		element: <AuthorizedLayout role={["vendor", "admin"]} />,
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />,
				children: [
					{
						path: "/dashboard",
						element: <OverviewTab />,
					},
					{
						path: "/dashboard/products",
						element: <ProductsTab />,
					},
					{
						element: <AuthorizedLayout role={["admin"]} />,
						children: [
							{
								path: "/dashboard/users",
								element: <UsersTab />,
							},
						],
					},
				],
			},
		],
	},

	{
		element: <GuestLayout />,
		children: [
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);

export default router;
