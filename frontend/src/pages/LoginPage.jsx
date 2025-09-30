import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-7xl md:h-[850px] h-[700px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row relative overflow-hidden">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30 relative z-10">
              <div className="w-full max-w-md">
                {/* HEADING TEXT - With staggered animations */}
                <div className="text-center mb-10">
                  <div className="animate-bounce-in">
                    <MessageCircleIcon className="w-16 h-16 mx-auto text-gradient mb-6 glow-cyan" />
                  </div>
                  <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-200 bg-clip-text text-transparent mb-3">
                      Welcome Back
                    </h2>
                  </div>
                  <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <p className="text-slate-400 text-lg">Sign in to continue your conversations</p>
                  </div>
                </div>

                {/* FORM - With staggered animations */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* EMAIL INPUT */}
                  <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                    <label className="auth-input-label">Email Address</label>
                    <div className="relative group">
                      <MailIcon className="auth-input-icon group-focus-within:text-cyan-400 group-focus-within:scale-110 transition-all duration-300" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input group"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                    <label className="auth-input-label">Password</label>
                    <div className="relative group">
                      <LockIcon className="auth-input-icon group-focus-within:text-cyan-400 group-focus-within:scale-110 transition-all duration-300" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="animate-fade-in-up" style={{animationDelay: '1s'}}>
                    <button 
                      className="auth-btn btn-hover-effect relative overflow-hidden group" 
                      type="submit" 
                      disabled={isLoggingIn}
                    >
                      <div className="flex items-center justify-center">
                        {isLoggingIn ? (
                          <>
                            <LoaderIcon className="w-5 h-5 animate-spin mr-2" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Sign In</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </form>

                <div className="mt-8 text-center animate-fade-in-up" style={{animationDelay: '1.2s'}}>
                  <Link to="/signup" className="auth-link inline-flex items-center space-x-2 group">
                    <span>Don't have an account?</span>
                    <span className="font-semibold text-cyan-400 group-hover:text-cyan-300">Sign Up</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-8 bg-gradient-to-bl from-slate-800/30 via-slate-700/20 to-transparent relative">
              {/* Floating background elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl floating-1" />
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl floating-2" />
              
              <div className="relative z-10">
                <div className="animate-float">
                  <img
                    src="/login.png"
                    alt="People using mobile devices"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
                
                <div className="mt-8 text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
                    Connect Instantly
                  </h3>

                  <div className="flex justify-center gap-3 flex-wrap">
                    <span className="auth-badge animate-bounce-in" style={{animationDelay: '0.8s'}}>
                      🚀 Fast
                    </span>
                    <span className="auth-badge animate-bounce-in" style={{animationDelay: '1s'}}>
                      🔒 Secure
                    </span>
                    <span className="auth-badge animate-bounce-in" style={{animationDelay: '1.2s'}}>
                      💬 Real-time
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginPage;
