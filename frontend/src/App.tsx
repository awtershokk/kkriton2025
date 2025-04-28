import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage.tsx";
import LoginForm from "./pages/Auth/LoginPage.tsx";
import RegForm from "./pages/Auth/RegisterPage.tsx";
import AboutPage from "./pages/AboutPage/AboutPage.tsx";
import AssistantPage from "./pages/Asist/AssistantPage.tsx";
import HelpPage from "./pages/HelpPage/HelpPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegForm />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/assistant" element={<AssistantPage/>} />
                <Route path="/help" element={<HelpPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
            </Routes>
        </Router>
    );
};

export default App;
