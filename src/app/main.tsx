import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../styles/global.scss";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<Auth0Provider
				domain="dev-6b2nksnupmtmpj06.us.auth0.com"
				clientId="3Oy32sIaJGvLBB497xmWHiaJ7tGmk91M"
				cacheLocation="localstorage"
				authorizationParams={{
					redirect_uri: window.location.origin,
				}}
				onRedirectCallback={(appState) => {
					if (appState?.returnTo)
						window.location.replace(appState.returnTo);
				}}
			>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Auth0Provider>
		</Provider>
	</React.StrictMode>
);
