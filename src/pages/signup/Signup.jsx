const Signup = () => {
  return (
    // <div className={styles.parentContainer}>
    //   <div className={styles.formContainer}>
    //     <img width={"100%"} height={"100%"} src={logo} alt="Logo" />
    //   </div>

    //   <div className={styles.formContainer}>
    //     <h2>Sign Up</h2>

    //     <div>
    //       <div className={styles.inputBoxLabel}> Name </div>
    //       <Input
    //         type="text"
    //         placeholder="Name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <div className={styles.inputBoxLabel}>
    //         Email
    //         {/* <span style={{ color: "red" }}>*</span> */}
    //       </div>
    //       <Input
    //         type="text"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <div className={styles.inputBoxLabel}>Phone Number</div>
    //       <Input
    //         type="text"
    //         placeholder="Phone Number"
    //         value={phone}
    //         onChange={(e) => setPhone(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <div className={styles.inputBoxLabel}>Password</div>
    //       <Input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <div className={styles.inputBoxLabel}>Confirm Password</div>
    //       <Input
    //         type="password"
    //         placeholder="Password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //     </div>

    //     <Button
    //       type="primary"
    //       block
    //       onClick={handleSignup}
    //       disabled={!email || !password || !confirmPassword || !phone}
    //     >
    //       SignUp
    //     </Button>
    //   </div>
    // </div>
    <div id="page-wrapper">
      <div className="main-page signup-page">
        <h2 className="title1">SignUp Here</h2>
        <div className="sign-up-row widget-shadow"> 
          <h5>Personal Information :</h5>
          <form action="#" method="post">
            <div className="sign-u">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                required=""
              />
              <div className="clearfix"> </div>
            </div>
            <div className="sign-u">
              <input type="text" placeholder="Last Name" required="" />
              <div className="clearfix"> </div>
            </div>
            <div className="sign-u">
              <input type="email" placeholder="Email Address" required="" />
              <div className="clearfix"> </div>
            </div>
            <div className="sign-u">
              <div className="sign-up1">
                <h4>Gender* :</h4>
              </div>
              <div className="sign-up2">
                <label>
                  <input type="radio" name="Gender" required="" />
                  Male
                </label>
                <label>
                  <input type="radio" name="Gender" required="" />
                  Female
                </label>
              </div>
              <div className="clearfix"> </div>
            </div>
            <h6>Login Information :</h6>
            <div className="sign-u">
              <input type="password" placeholder="Password" required="" />
              <div className="clearfix"> </div>
            </div>
            <div className="sign-u">
              <input
                type="password"
                placeholder="Confirm Password"
                required=""
              />
            </div>
            <div className="clearfix"> </div>
            <div className="sub_home">
              <input type="submit" value="Submit" />
              <div className="clearfix"> </div>
            </div>
            <div className="registration">
              Already Registered.
              <a className="" href="login.html">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
