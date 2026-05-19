import { useNavigate } from "react-router-dom"

function ProfileIcon() {
  const navigate = useNavigate()

  let user = null
  try {
    user = JSON.parse(localStorage.getItem("user"))
  } catch {
    localStorage.removeItem("user")  // wipe corrupted data
    return null
  }

  if (!user) return null

  const { firstName = "", lastName = "", accountType = "" } = user

  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
  const name = `${firstName} ${lastName}`.trim()

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end leading-5">
        <span className="font-semibold text-sm">{name}</span>
        {accountType && (
          <span className="text-xs text-gray-500">{accountType}</span>
        )}
      </div>

      <div
        className="avatar"
        onClick={() => navigate("/dashboard")}
        role="button"
        aria-label={`Go to ${name}'s dashboard`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard")}
      >
        {initials}
      </div>
    </div>
  )
}

export default ProfileIcon