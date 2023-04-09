import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../auth/UserContext";
const FormProfile = () => {
  const { user, profileChange } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      try {
        profileChange(user.username, values);
        alert("Successfully Changed");
      } catch (e) {
        formik.setErrors({ backendError: e });
      }
    },
  });

  if (user) {
    formik.initialValues.firstName = user.firstName;
    formik.initialValues.lastName = user.lastName;
    formik.initialValues.email = user.email;
  }

  return (
    <div className='FormProfile'>
      {user ? (
        <form onSubmit={formik.handleSubmit}>
          <h4>Username:{user.username}</h4>
          <label htmlFor='firstName'>First Name</label>
          <input
            id='firstName'
            type='text'
            {...formik.getFieldProps("firstName")}
          />

          <label htmlFor='lastName'>Last Name</label>
          <input
            id='lastName'
            type='text'
            {...formik.getFieldProps("lastName")}
          />

          <label htmlFor='email'>Email</label>
          <input id='email' type='text' {...formik.getFieldProps("email")} />

          {/* backend error handling*/}
          {formik.errors.backendError ? (
            <div>{formik.errors.backendError}</div>
          ) : null}

          <button type='submit'>Save Change</button>
        </form>
      ) : null}
    </div>
  );
};

export default FormProfile;
