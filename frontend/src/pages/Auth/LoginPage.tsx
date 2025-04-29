import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/background/veterans.jpg";

const LoginForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError('')

        try {
            const nkoResponse = await fetch('http://localhost:8080/api/v1/nko/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: username, password })
            })
            if (!nkoResponse.ok) {
                const nkoErrorData = await nkoResponse.json()
                if (nkoErrorData.error === 'invalid email or password') {
                    const volunteerResponse = await fetch('http://localhost:8080/api/v1/volunteers/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: username, password })
                    })

                    if (!volunteerResponse.ok) {
                        const volunteerErrorData = await volunteerResponse.json()
                        setError(volunteerErrorData.error || 'Не удалось войти')
                        return
                    }

                    const volunteerData = await volunteerResponse.json()
                    localStorage.setItem('userId', volunteerData.id.toString())
                    localStorage.setItem('userType', 'volunteer')

                    // Переходим на страницу
                    navigate('/about')
                    return
                }
            } else {
                const nkoData = await nkoResponse.json()
                localStorage.setItem('userId', nkoData.id.toString())
                localStorage.setItem('userType', 'nko')

                navigate('/about')
                return
            }
        } catch (err) {
            setError('Ошибка подключения к серверу')
            console.error('Error during login:', err)
        }

        setError('Неверный логин или пароль')
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const handleRegisterRedirect = () => {
        navigate('/register')
    }

    return (
        <div
            className="w-screen min-h-screen flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >

            <form
                onSubmit={handleSubmit}
                className="bg-opacity p-8 rounded-lg shadow-xl w-96"
                autoComplete="off"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">
                    Вход
                </h2>

                <input type="text" name="hiddenUsername" className="hidden" autoComplete="username"/>
                <input type="password" name="hiddenPassword" className="hidden" autoComplete="new-password"/>

                <>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-white mb-1">
                            Логин
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            autoComplete="off"
                            name="notUsername"
                        />
                    </div>

                    <div className="relative mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                            Пароль
                        </label>

                        <input type="password" name="hidden" className="hidden" autoComplete="off"/>

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm pr-10"
                                autoComplete="new-password"
                                name="notPassword"
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
                </>

                <button
                    type="submit"
                    className="w-full bg-[rgba(233,81,0,0.8)] text-[23px] hover:bg-[#E95100] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 mb-4 shadow-md"
                >
                    Войти
                </button>

                {error && (
                    <div className="text-red-500 text-center mb-4">
                        Неверный логин или пароль
                    </div>
                )}

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-300">
                        Нет аккаунта?{' '}
                        <button
                            type="button"
                            onClick={handleRegisterRedirect}
                            className="text-white hover:text-[rgba(233,81,0,0.8)] focus:outline-none font-medium transition-colors duration-200"
                        >
                            Зарегистрируйтесь
                        </button>
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                        <button
                            type="button"
                            className="text-white hover:text-[rgba(233,81,0,0.8)] focus:outline-none font-medium transition-colors duration-200"
                        >
                            Войти как гость
                        </button>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default LoginForm
