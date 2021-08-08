import { useForm } from "react-hook-form";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useEffect } from "react";

export default function Account() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("account", JSON.stringify(data));
    NotificationManager.success("Account berhasil disimpan", "Sukses");
  };

  useEffect(() => {
    let data = localStorage.getItem("account");
    if (data) {
      let account = JSON.parse(data);
      reset({
        name: account.name,
        email: account.email,
        address: account.address,
      });
    }
  }, []);

  return (
    <>
      <h3>Halaman Account</h3>
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
              <input type="submit" value="Simpan" className="btn" />
            </form>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </>
  );
}
