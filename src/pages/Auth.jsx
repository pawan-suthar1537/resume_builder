import { Logo } from "../assets";
import { Footer } from "../containers/index";
import { Authbtnwithprovider, Spinner } from "../components";
import { FaGithub, FaGoogle } from "react-icons/fa";
import UseUser from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const { data, isLoading, isError } = UseUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="auth-section">
      <img src={Logo} className="w-12 h-auto object-contain" alt="" />
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-blue-700 text-3xl lg:text-4xl">
          Welcome to Resume
        </h1>
        <p className="text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          molestias.
        </p>
        <h2 className="text-2xl text-gray-600">Authenticate</h2>
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6">
          <Authbtnwithprovider
            Icon={FaGoogle}
            label="Sign in with Google"
            provider="GoogleAuthProvider"
          />
          <Authbtnwithprovider
            Icon={FaGithub}
            label="Sign in with GitHub"
            provider="GithubAuthProvider"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
