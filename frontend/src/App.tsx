import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage.tsx";
import LoginForm from "./pages/Auth/LoginPage.tsx";
import RegForm from "./pages/Auth/RegisterPage.tsx";
import AboutPage from "./pages/AboutPage/AboutPage.tsx";
import AssistantPage from "./pages/Asist/AssistantPage.tsx";
import HelpPage from "./pages/HelpPage/HelpPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import EventsPage from "./pages/EventsPage/EventsPage.tsx";
import EventsCreatePage from "./pages/EventsPage/EventsCreatePage.tsx";
import CreateDonationPage from "./pages/HelpPage/HelpCreatePage.tsx";

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
                <Route path="/help/create" element={<CreateDonationPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/events" element={<EventsPage/>} />
                <Route path="/events/create" element={<EventsCreatePage/>} />
            </Routes>
        </Router>
    );
};

export default App;
