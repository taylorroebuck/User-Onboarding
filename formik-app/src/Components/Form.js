import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup"; // for everything
import "../App.css";

const UserForm = ({ values, touched, errors, status }) => {
  const [users, setUser] = useState([]);
  console.log(users)
  
  useEffect(() => {
      if (status) {
          setUser([...users, status]);
      }
  }, [status]);

  return (
      <div className="onboarding">
          <h1>User Onboarding</h1>
          <h2>Please fill out the information below.</h2>
          <Form className="form">
              <Field type="text" component="input" name="name" placeholder="Name" />
              {touched.name && errors.name && (
                  <p className="error">{errors.name}</p>
              )}
              <br /><br />
              <Field type="email" name="email" placeholder="Email" />
              {touched.email && errors.email && (
                  <p className="error">{errors.email}</p>
              )}
              <br /> <br />
              <Field component="select" className="role" name="role">
                  <option>Select Your Role</option>
                  <option value="dev">Software Developer</option>
                  <option value="mobile">IOS Developer</option>
                  <option value="ux">UX Designer</option>
              </Field>
              {touched.role && errors.role && (
                  <p className="error">{errors.role}</p>
              )}
              <br /> <br />
              <Field component="input" type="password" name="password" placeholder="Password" />
              {touched.password && errors.password && (
                  <p className="error">{errors.password}</p>
              )}
              <br /> <br />
              <label className="checkbox">
                  I agree to the Terms of Service
                  <Field type="checkbox" name="termsOfService" checked={values.termsOfService} />
                  {touched.termsOfService && errors.termsOfService && (
                      <p className="error">{errors.termsOfService}</p>
                  )}
              </label>
              <br /> <br />
              <button type="submit">Submit</button>
          </Form>
          {users.map(user => (
              <p key={user.id}>
                  <h2>{user.name}</h2>
                  <h2>{user.role}</h2>
                  <h2>{user.email}</h2>
                </p>
          ))}
      </div>
  );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, role, password, termsOfService }) {
        return {
            name: name || "",
            email: email || "",
            role: role || "",
            password: password || "",
            termsOfService: termsOfService || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("What's your name?"),
        email: Yup.string().required("What's your email?"),
        role: Yup.string().required("What's your role?"),
        password: Yup.string().required("You must have a password"),
        termsOfService: Yup.bool()
            .oneOf([true], "Please agree to our terms")
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post('https://reqres.in/api/users', values)
            .then(results => {
                console.log("handleSubmit: then: results: ", results);
                setStatus(results.data);
                resetForm();
            })
            .catch(err => console.log(err.results));
    }
});

const UserFormWithFormik = FormikUserForm(UserForm);

export default UserFormWithFormik;