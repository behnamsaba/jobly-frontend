import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from "react";
import "./Login.css";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      try {
        login(values);
        navigate("/");
      } catch (e) {
        formik.setErrors({ backendError: e });
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" {...formik.getFieldProps("username")} />
      {formik.touched.username && formik.errors.username ? (
        <p>{formik.errors.username}</p>
      ) : null}

      <label htmlFor="passwrod">Password</label>
      <input
        id="password"
        type="password"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password ? (
        <p>{formik.errors.password}</p>
      ) : null}

      {/* backend error handling*/}
      {formik.errors.backendError ? (
        <div>{formik.errors.backendError}</div>
      ) : null}

      <button type="submit">login</button>
    </form>
  );
};

export default Login;
