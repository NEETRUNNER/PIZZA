import Login from "../authorization/Login";

import { Selectors } from "../redux/selectors";

const LoginPage = () => {
    const {loginToken} = Selectors();

    return (
        <section className="registration flex items-center justify-center">
            <div className="registration-container w-11/12 flex flex-wrap justify-center gap-x-24 my-[10%]">
                {loginToken ? <div className="text-black">Успешная авторизация</div> : <Login/>}
            </div>
        </section>
    )
}

export default LoginPage;