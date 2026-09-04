import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Changed 'tourist' to 'user' to align perfectly with your Backend User model
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    console.log("Login Component: Submitting login credentials...", formData);

    try {
      const loggedInUser = await login(formData.email, formData.password);
      console.log("Login Component: Authentication successful. Logged in user payload:", loggedInUser);

      // Role Check Verification Loop
      if (loggedInUser.role !== formData.role) {
        console.warn(`Login Component: Role mismatch detected. Chosen: ${formData.role}, Database: ${loggedInUser.role}`);
        setErrorMessage(`Account exists, but your database profile role is recorded as '${loggedInUser.role}'. Please select the correct role option.`);
        setLoading(false);
        return;
      }

      // Safe Redirect Protocol Matrix
      if (loggedInUser.role === "admin") {
        console.log("Login Component: Redirecting client browser layout thread to /admin/settings");
        navigate("/admin/settings");
      } else {
        console.log("Login Component: Redirecting client browser layout thread to /dashboard");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Component: Catch handler captured failure string:", err);
      setErrorMessage(err || "Authentication pipeline failure. Verify your endpoint setup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          
          {errorMessage && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Portal Role
              </label>
              <select
                name="role"
                disabled={loading}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100"
                value={formData.role}
                onChange={handleChange}
              >
                {/* Standardized options values to align perfectly with User model enums */}
                <option value="user">Tourist / Explorer</option>
                <option value="business">Business / Host</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer disabled:bg-blue-400"
              >
                {loading ? "Verifying Credentials..." : "Log In"}
              </button>
              <span className="font-extralight text-gray-600 block text-center mb-2 text-sm">
                Didn't have an account?
              </span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
