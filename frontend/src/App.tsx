import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage.tsx";
import HelpPage from "./pages/HelpPage/HelpPage.tsx";

const App = () => {

    return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/help" element={<HelpPage />} />
                </Routes>
            </Router>
    );
};

export default App;
