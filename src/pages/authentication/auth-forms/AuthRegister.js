import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import FirebaseSocial from "./FirebaseSocial";
import AnimateButton from "components/@extended/AnimateButton";
import { strengthColor, strengthIndicator } from "utils/password-strength";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { MenuItem } from "../../../../node_modules/@mui/material/index";
// import { useQuery } from '../../../../node_modules/@tanstack/react-query/build/lib/useQuery';
import axios from "../../../../node_modules/axios/index";
import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const navigate = useNavigate("/login");
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const userType = {
    doctor: "MEDECIN",
    nurse: "INFIRMIER",
  };
  const sex = {
    male: "MASCULIN",
    female: "FEMININ",
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const handleType = (type) => {
    return type;
  };
  useEffect(() => {
    changePassword("");
  }, []);

  const OhandleSubmit = (values) => {
    const user = {
      firstName: values.firstname,
      lastName: values.lastname,
      address: values.address,
      password: values.password,
      email: values.email,
      type: values.type,
      sex: values.sex,
      phone: values.phone,
    };
    console.log("user: ", user);
    axios
      .post("http://localhost:3001/auth/register", user)
      .then((response) => {
        navigate('/login'), console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          sex: "",
          email: "",
          address: "",
          password: "",
          type: "",
          phone: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required("Le nom est obligatoire"),
          lastname: Yup.string().max(255).required("Le prénom est obligatoire"),
          sex: Yup.string().max(255).required("Le sexe est obligatoire"),
          type: Yup.string()
            .max(255)
            .required("Le type d'utilisateur est obligatoire"),
          email: Yup.string()
            .email("Doit etre un email valide")
            .max(255)
            .required("Email est obligatoire"),
          password: Yup.string()
            .max(255)
            .required("Mot de passe est obligatoire"),
          phone: Yup.string()
            .max(255)
            .required("Le numéro de téléphone est obligatoire"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
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
          <form
            noValidate
            onSubmit={handleSubmit}
            method="POST"
            action="submit"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">Nom*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="AWOUNO"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Prénom(s)*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Kosi Winner"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="sex-signup">Sexe*</InputLabel>
                  <Select
                    fullWidth
                    labelId="Sexe"
                    id="sex-signup"
                    // value=
                    label="sex"
                    name="sex"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  >
                    <MenuItem value={handleType(sex.male)}>{sex.male}</MenuItem>
                    <MenuItem value={handleType(sex.female)}>
                      {sex.female}
                    </MenuItem>
                  </Select>
                  {touched.sex && errors.sex && (
                    <FormHelperText error id="helper-text-sex-signup">
                      {errors.sex}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-add">Téléphone*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    id="phone-add"
                    name="phone"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="+22899782841"
                    inputProps={{}}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-add">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address-signup">Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                    id="address-signup"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Kodjoviakopé"
                    inputProps={{}}
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error id="helper-text-address-signup">
                      {errors.address}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="Type-signup">
                    Type d{`'`}utilisateur
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="Type d'utilisateur"
                    id="UserType-signup"
                    // value=
                    label="type"
                    name="type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  >
                    <MenuItem value={handleType(userType.doctor)}>
                      {userType.doctor}
                    </MenuItem>
                    <MenuItem value={handleType(userType.nurse)}>
                      {userType.nurse}
                    </MenuItem>
                  </Select>

                  {touched.type && errors.type && (
                    <FormHelperText error id="helper-text-type-signup">
                      {errors.type}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@address.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">
                    Mot de passe
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        sx={{
                          bgcolor: level?.color,
                          width: 85,
                          height: 8,
                          borderRadius: "7px",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  j{`'`}accepte les &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    conditions d{`'`}utilisation
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
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
                    onClick={() => OhandleSubmit(values)}
                    variant="contained"
                    color="primary"
                  >
                    Créer maintenant
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Se connecter avec</Typography>
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

export default AuthRegister;
