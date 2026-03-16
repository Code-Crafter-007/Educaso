function Signup({switchMode}) {
  return (

    <div className="auth-card">

      <h1>Create Account</h1>
      <p className="subtitle">Start your learning journey today</p>

      <input type="text" placeholder="First Name"/>
      <input type="text" placeholder="Last Name"/>

      <input type="email" placeholder="Email Address"/>
      <input type="password" placeholder="Password"/>
      <input type="password" placeholder="Confirm Password"/>

      <button className="primary-btn">Create Account</button>

      <p className="switch">
        Already have an account?
        <span onClick={switchMode}>Sign in</span>
      </p>

    </div>

  );
}

export default Signup;