import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const Register = () => {

const [agree,setAgree] = React.useState(false)
const [errors,setError] = React.useState({})

const navigate = useNavigate()

const [user,setUser] = React.useState({
    username: "",
    password: "",
    confirmPassword:"",
    gender: "",
    dob: "",
    age: {year:"",month:"",day:""},
    email: "",
})

const handleChange = (e)=>{
    const {name,value} = e.target
    setUser({...user,[name]:value})

  }


const validateUsername = ()=>{

  const uName = user.username
  const newUsers = JSON.parse(localStorage.getItem("users"))

    Array.isArray(newUsers) && newUsers.filter((u)=> u?.username == uName ? alert("User already exist"):null)  
}

const validateConfirmPassword = ()=>{
    if(user.confirmPassword != user.password ){
        setError({...errors,confirmPassword:"Password did not match"})
    }else{
        setError({})
    
} 
}

const validateAge = ()=>{
        if(user.dob){
        const date = new Date(user.dob)

        var d1 = date.getDate()
        var m1 = date.getMonth()
        var y1 = date.getFullYear()

        var date2 = new Date()
        
        var d2 = date2.getDate()
        var m2 = 1 + date2.getMonth()
        var y2 = date2.getFullYear()
        var month = [31,28,31,30,31,30,31,31,30,31,30,31]

        if(d1 > d2){
            d2 = d2 + month[m2 - 1];
            m2 = m2 -1
        }

        if(m1 > m2){
            m2 = m2 +12;
            y2 = y2 -1;
        }

        var d = d2 - d1;
        var m = m2 - m1;
        var y = y2 - y1;

        setUser({...user,age:{year:y,month:m,day:d}})
        
}else{
    setError({})
}

}

const handleSubmit = (e)=>{
  e.preventDefault()
  console.log(user);

  const newUsers = JSON.parse(localStorage.getItem("users"))
  Array.isArray(newUsers) && newUsers.push(user)
  localStorage.setItem("users",JSON.stringify(newUsers))
  alert("user created")

 setUser({
  username: "",
  password: "",
  confirmPassword:"",
  gender: "",
  dob: "",
  age: "",
  email: "",
 })
 navigate("/")
 
}

React.useEffect(()=>{
    validateUsername();
    validateAge();
    validateConfirmPassword();
},[user])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

                <form onSubmit={handleSubmit}>
                  <Box
                    component=""
                    noValidate
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="username"
                          label="User Name"
                          name="username"
                          value={user.username}
                          onChange={e=>handleChange(e)}
                          autoComplete="username"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          value={user.password}
                          label="Password"
                          type="password"
                          id="password"
                          onChange={e=>handleChange(e)}
                          error={!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(user.password)?true:false}
                          helperText={!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(user.password)?"Password must have min 8 characters and 1 cap & small letter, Symbol":null}
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="confirmPassword"
                          value={user.confirmPassword}
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          onChange={e=>handleChange(e)}
                          error={errors?.confirmPassword ? true : false}
                          helperText={errors?.confirmPassword}
                          autoComplete="confirmPassword"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          fullWidth
                          label="Gender"
                          name="gender"
                          value={user.gender}
                          onChange={e=>handleChange(e)}
                          labelId="Gender"
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="dob"
                          value={user.dob}
                          //   label="Birth-Date"
                          type="date"
                          id="dob"
                          onChange={e=>handleChange(e)}
                          autoComplete="dob"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="age"
                          value={`${user.age.year}years ${user.age.month} months ${user.age.day} day` }
                          label="Age"
                          type="text"
                          id="age"
                          onChange={e=>handleChange(e)}
                          error={user.age.year < 18 ? true : false}
                          helperText={user.age.year < 18 ? " Age must be above 18 years" : null}
                          autoComplete="age"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          value={user.email}
                          onChange={e=>handleChange(e)}
                          error={!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/.test(user.email)? true : false}
                          helperText={! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/.test(user.email)?"Enter valid Email Address":null}
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              name="agree"
                              value={agree}
                              onChange={e=>setAgree(e.target.checked)}
                            />
                          }
                          label="I agree to terms and conditions"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      disabled={!agree?true:false}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
