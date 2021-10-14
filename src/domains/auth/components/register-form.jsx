import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { useRegister } from '../auth.state';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().required('Confirm your password'),
});

export const RegisterForm = () => {
  const [status, setStatus] = React.useState('idle');
  const [errorMessage, setErrorMessage] = React.useState([]);
  const register = useRegister();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      setErrorMessage([]);
      setStatus('idle');

      const { name, email, password, confirmPassword } = values;

      if (confirmPassword !== password) {
        setErrors({
          confirmPassword: 'Password is not similar',
          password: 'Confirm password is not similar',
        });
        return;
      }

      setStatus('loading');
      register({ name, email, password })
        .then(() => {
          setStatus('success');
          resetForm();
        })
        .catch(async (error) => {
          setStatus('idle');
          const { message } = await error.response.json();
          setErrorMessage(message);
        });
    },
  });

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-6 bg-white shadow">
      <form onSubmit={formik.handleSubmit} className="p-6">
        {status === 'error' && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">Fail to register.</div>
        )}
        {status === 'success' && (
          <div className="p-2 text-green-800 bg-green-200 rounded-sm">Register.</div>
        )}
        {errorMessage.length > 0 && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            {errorMessage.map((el) => (
              <React.Fragment key={el}>
                {el}
                <br />
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">Register</div>
        <div className="space-y-6">
          <TextField
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            id="name"
            autoFocus
            required
            disabled={status === 'loading'}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="block text-xs text-red-500">{formik.errors.name}</div>
          )}
          <TextField
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            autoFocus
            required
            disabled={status === 'loading'}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="block text-xs text-red-500">{formik.errors.email}</div>
          )}
          <TextField
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            id="password"
            type="password"
            required
            disabled={status === 'loading'}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="block text-xs text-red-500">{formik.errors.password}</div>
          )}
          <TextField
            label="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            required
            disabled={status === 'loading'}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="block text-xs text-red-500">{formik.errors.confirmPassword}</div>
          )}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === 'loading'}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
