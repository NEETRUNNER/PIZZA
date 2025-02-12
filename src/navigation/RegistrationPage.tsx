import Registration from "../authorization/Registration";

const RegistrationPage: React.FC = () => {
    return (
        <section className="registration flex items-center justify-center">
            <div className="registration-container w-full flex flex-wrap justify-center gap-x-24 my-[10%]">
                <Registration/>
            </div>
        </section>
    )
}

export default RegistrationPage;