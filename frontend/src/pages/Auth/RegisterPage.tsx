import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import backgroundImg from "../../assets/background/veterans.jpg"
import Tabs from "../../components/Buttons/Tabs.tsx"

const RegForm = () => {
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>('volunteer')
    const [fullName, setFullName] = useState<string>('')
    const [shortName, setShortName] = useState<string>('')
    const [inn, setInn] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            let response
            if (activeTab === 'volunteer') {
                response = await fetch('http://localhost:8080/api/v1/volunteers/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        full_name: fullName,
                        email,
                        phone,
                        password
                    }),
                })
            } else {
                response = await fetch('http://localhost:8080/api/v1/volunteers/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        full_name: shortName,
                        email,
                        phone,
                        password
                    }),
                })
            }

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка регистрации')
            }

            localStorage.setItem('userId', data.id.toString())
            localStorage.setItem('userType', activeTab)

            navigate('/about')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка')
        } finally {
            setIsLoading(false)
        }
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const handleRegisterRedirect = () => {
        navigate('/login')
    }

    const tabs = [
        { key: 'volunteer', label: 'Волонтер' },
        { key: 'nko', label: 'НКО' },
    ]

    return (
        <div
            className="w-screen min-h-screen flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            <form
                onSubmit={handleSubmit}
                className="bg-opacity p-8 rounded-lg shadow-xl w-96"
                autoComplete="off"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">
                    Регистрация
                </h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <input type="text" name="hiddenUsername" className="hidden" autoComplete="username"/>
                <input type="password" name="hiddenPassword" className="hidden" autoComplete="new-password"/>

                <>
                    {activeTab === 'volunteer' && (
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1">
                                ФИО
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                autoComplete="off"
                                name="fullName"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            autoComplete="off"
                            name="email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                            Телефон
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            autoComplete="off"
                            name="phone"
                            required
                        />
                    </div>

                    <div className="relative mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm pr-10"
                                autoComplete="new-password"
                                name="password"
                                required
                                minLength={6}
                            />
                            {password && (
                                <button
                                    type="button"
                                    onClick={handleTogglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <FaRegEye className="h-5 w-5"/>
                                    ) : (
                                        <FaRegEyeSlash className="h-5 w-5"/>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {activeTab === 'nko' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="shortName" className="block text-sm font-medium text-white mb-1">
                                    Наименование
                                </label>
                                <input
                                    type="text"
                                    id="shortName"
                                    value={shortName}
                                    onChange={(e) => setShortName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="inn" className="block text-sm font-medium text-white mb-1">
                                    ИНН
                                </label>
                                <input
                                    type="text"
                                    id="inn"
                                    value={inn}
                                    onChange={(e) => setInn(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                    required
                                />
                            </div>
                        </>
                    )}
                </>

                <button
                    type="submit"
                    className="w-full bg-[rgba(233,81,0,0.8)] text-[20px] hover:bg-[#E95100] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 mb-4 shadow-md"
                    disabled={isLoading}
                >
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-300">
                        Уже есть аккаунт?{' '}
                        <button
                            type="button"
                            onClick={handleRegisterRedirect}
                            className="text-white hover:text-[rgba(233,81,0,0.8)] focus:outline-none font-medium transition-colors duration-200"
                        >
                            Войти
                        </button>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegForm