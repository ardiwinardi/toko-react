import { useForm } from "react-hook-form";
import "react-notifications/lib/notifications.css";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import useUpdateProfile from "hooks/useUpdateProfile";

export default function Account() {
  const history = useHistory();
  const { me, getMe } = useContext(AuthContext);
  const [updateProfile, isLoading] = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      await getMe();
      NotificationManager.success("Profile berhasil perbaharui", "Sukses");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (me) {
      reset({
        name: me.name,
        email: me.email,
        address: me.address,
      });
    } else {
      history.push({
        pathname: "/login",
        state: { message: "Silakan login terlebih dahulu" },
      });
    }
  }, [me]);

  return (
    <>
      <h3>My Account</h3>
      <div className="row">
        <div className="col-75">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-50">
                  <h3></h3>
                  <label htmlFor="cname">
                    Name{" "}
                    {errors.name && (
                      <span style={{ color: "red" }}>
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "harus diisi" })}
                    placeholder="John More Doe"
                  />
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
                  <label htmlFor="expmonth">
                    Address{" "}
                    {errors.address && (
                      <span style={{ color: "red" }}>
                        {errors.address.message}
                      </span>
                    )}
                  </label>
                  <textarea
                    {...register("address", { required: "harus diisi" })}
                    placeholder="Please fill the adress"
                  />
                </div>
              </div>
              <button type="submit" className="btn">
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}
