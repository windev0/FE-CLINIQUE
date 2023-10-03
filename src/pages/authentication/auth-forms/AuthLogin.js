import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import swal from "../../../assets/sweet.alert";
import { PATIENT_CONTEXT } from "pages/context/PatientContext";
import axios from "../../../../node_modules/axios/index";


// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = useState(false);
  const { setMessage , setUser} = useContext(PATIENT_CONTEXT);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleSignIn = (values) => {
    const { email, password } = values;

    axios
      .post("http://localhost:3001/auth/login", { email, password })
      .then((response) => {
        const { data } = response;
        const { firstName, lastName, type } = data;
        const userRefactory = {
          firstName: firstName,
          lastName: lastName,
          type: type,
        };
        {
          swal(`Soyez la bienvenue ${firstName} ${lastName}`, "", "success");
        }
        setUser(userRefactory);
        navigate("/dashboard/default");
      })
      .catch(function (error) {
        console.log(error);
        {
          setMessage("Email ou mot de passe invalide");
        }
        return (
          <div> {swal("Email ou mot de passe incorrect", "", "error")}</div>
        );
      });

    console.log(values);
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "delali@gmail.com",
          password: "winner@3002",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Mot de passe</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6">Se souvenir de moi</Typography>
                    }
                  />
                  {/* <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Mot de passe oublié ?
                  </Link> */}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    onClick={() => handleSignIn(values)}
                    variant="contained"
                    color="primary"
                  >
                    Se connecter
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Me connecter avec</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
