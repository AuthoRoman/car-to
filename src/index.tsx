import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./state/slices";

import "./i18n";
import { Suspense } from "react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { ThemeContextProvider } from "./core/contexts/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const store = setupStore();
root.render(
  <Provider store={store}>
    <Suspense fallback={<CircularProgress />}>
      <ThemeContextProvider>
        <CssBaseline />
        <App />
      </ThemeContextProvider>
    </Suspense>
  </Provider>,
);
