import logo from "../../assets/logo.png"

function Logo(){

    return(
        <div className="logo-container">
            <img src={logo} alt="Educaso logo" className="logo-image"/>
            
            <span className="brand-name">
                EDUCA<span className="brand-highlight">SO</span>
            </span>
        </div>
    )
}

export default Logo