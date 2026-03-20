import classroomImg from '../../assets/classroom.jpeg'
function AuthIllustration(){
  return(

    <div className="auth-illustration">
      <div className="image-card">
        <img src={classroomImg} alt="classroom" />
      

      <div className="stats-card">
        <div className="stats-icon">✔</div>

        <div>
          <h3>5,000+</h3>
          <p>Courses Available</p>
        </div>
      </div>
      </div>

    </div>
  );
}

export default AuthIllustration;