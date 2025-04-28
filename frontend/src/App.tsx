import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage.tsx";
import LoginForm from "./pages/Auth/LoginPage.tsx";
import RegForm from "./pages/Auth/RegisterPage.tsx";
import HelpPage from "./pages/HelpPage/HelpPage.tsx";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegForm />} />
                <Route path="/help" element={<HelpPage />} />
            </Routes>
        </Router>
    );
};

export default App;
