import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await signIn(data);
  };

  return (
    <>
      <h3>Login to your Account</h3>
      <div className="row">
        <div className="col-75">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-50">
                  <h3></h3>
                  <label htmlFor="ccnum">
                    Email{" "}
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    {...register("email", { required: "harus diisi" })}
                    placeholder="email@gmail.com"
                  />
                  <label htmlFor="ccnum">
                    Password{" "}
                    {errors.password && (
                      <span style={{ color: "red" }}>
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: "harus diisi" })}
                    placeholder=""
                  />
                </div>
              </div>
              <input type="submit" value="Login Now" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
};
