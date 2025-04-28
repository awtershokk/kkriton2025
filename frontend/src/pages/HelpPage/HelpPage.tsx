import Layout from "../../layouts/DefaultLayout.tsx";
import {useNavigate} from "react-router-dom";


const HelpPage = () => {
    const navigate = useNavigate();

    const handleSupportClick = () => {
        navigate("/help");
    };

    return (
        <Layout
            header={
                <h1 className="text-3xl font-bold text-white mb-6">
                    Помощь ветеренам
                </h1>
            }
            content={
                <div className="max-w-12xl mx-auto">
                </div>
            }
        />
    );
};

export default HelpPage;
