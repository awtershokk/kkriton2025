import Layout from "../../layouts/DefaultLayout.tsx";

const HelpPage = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Добро пожаловать на платформу помощи ветеранам</h1>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">О нашей платформе</h2>
                    <p className="text-gray-600 mb-4">
                        Это демонстрационная страница, показывающая использование лайаута с сайдбаром.
                        Сайдбар остается фиксированным при прокрутке и имеет одинаковые отступы сверху и снизу.
                    </p>
                    <p className="text-gray-600">
                        Основное содержимое страницы располагается справа от сайдбара с достаточным отступом.
                        Вы можете использовать этот лайаут для всех страниц вашего приложения для единообразия.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default HelpPage;