// importing libraries
import axios from "axios";
import React, { useContext,  useEffect,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "../login/login.css";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import hideicon from "../login/hide.png";
import viewicon from "../login/view.png";

const Login = () => {
  // eslint-disable-next-line
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // calling useNavigate function
  const navigate = useNavigate();

  // function that controlls the eye password
  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent form submission
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

useEffect(()=>{
if(!userData.user)
 {console.log(userData.user)
  navigate("/login");}
},[userData,navigate])


  //handle submit function to log in to an account
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const loginRes = await axios.post(
        `${process.env.REACT_APP_base_url}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );
      // console.log(loginRes);
      //update global state with response from backend(user-info)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      navigate("/");

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);
      //navigate user to homepage
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        // Extract the error message from the response and set it in the state
        setErrorMessage(error.response.data.msg);
      } else {
        // Fallback error message in case the response doesn't contain a specific error message
        setErrorMessage("An error occurred. Please try again later.");
      }

      console.log(error.response.data.msg);
    }
  };

  return (
    <div>
      {/* navigation */}
      <Nav />

      {/* the body of login page */}
      <div className="loginsection">
        <div className="logindiv1">
          <div className="login-internal">
            <h4 class="login">Login to your account</h4>
            <p>
              Don't have an account?
              <Link to="/signup" className="link">
                Create a new account
              </Link>
            </p>
            {/* login form */}

            <form onSubmit={handleSubmit}>
              {/* email field */}
              <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="Your Email"
                className="login-input"
              />
              <br />
              {/* password field */}
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Your Password"
                  className="login-input passwordInput"
                />

                <button
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img
                      className="hide-icon"
                      src={hideicon}
                      alt="hide-password-icon"
                    />
                  ) : (
                    <img
                      className="view-icon"
                      src={viewicon}
                      alt="view-password-icon"
                    />
                  )}
                </button>
              </div>
              <br />
              <div className="warning-message">{errorMessage}</div>

              {/* button to submit the form */}
              <button className="submit" onClick={handleSubmit}>
                submit
              </button>
            </form>
            <Link to="/signup" className="link">
              Create a new account
            </Link>
          </div>
        </div>

        {/* <div className="About"> */}
        <div className="Aboutt">
          <p className="p1">About</p>
          <div className="login-aboutTitle">Evangadi Network Q&A</div>
          <div className="paragraph">
            <p>
              No matter what stage of life you are in, whether you’re just starting 
              elementary school or being promoted to CEO of a Fortune 500 company, you have much to 
              offer to those who are trying to follow in your footsteps.
            </p>
            <p>
              Wheather you are willing to share your knowledge or you are just looking to meet 
              mentors of your own, please start by joining the network here.
            </p>
          </div>
          <button className="button">
            <a href="https://www.evangadi.com/explained/" target="blank">
              How it works
            </a>
          </button>
        </div>
        {/* </div> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
