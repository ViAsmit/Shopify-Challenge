import "./App.css";
import HomePage from "./pages/home_page/HomePage";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <HomePage />;
    </LocalizationProvider>
  );
}

export default App;
