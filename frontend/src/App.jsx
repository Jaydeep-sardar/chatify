import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useChatStore } from "./store/useChatStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const { getTotalUnreadCount } = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Update document title with unread count
  useEffect(() => {
    const unreadCount = getTotalUnreadCount();
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) Chatify - Real-time Chat`;
    } else {
      document.title = "Chatify - Real-time Chat";
    }
  }, [getTotalUnreadCount]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse" />
      
      {/* Floating Background Elements */}
      <div className="absolute top-10 left-10 size-72 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-[120px] floating-1" />
      <div className="absolute top-1/2 -right-10 size-96 bg-gradient-to-l from-cyan-500/20 to-blue-500/20 rounded-full blur-[120px] floating-2" />
      <div className="absolute -bottom-10 left-1/3 size-80 bg-gradient-to-t from-emerald-500/15 to-teal-500/15 rounded-full blur-[100px] floating-3" />
      
      {/* Subtle moving particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping" style={{animationDelay: '0s'}} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400/60 rounded-full animate-ping" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400/60 rounded-full animate-ping" style={{animationDelay: '4s'}} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-ping" style={{animationDelay: '6s'}} />
      </div>

      {/* Main Content with Page Transitions */}
      <div className="relative z-10 w-full max-w-7xl">
        <Routes>
          <Route path="/" element={
            <div className="page-enter page-enter-active">
              {authUser ? <ChatPage /> : <Navigate to={"/login"} />}
            </div>
          } />
          <Route path="/login" element={
            <div className="page-enter page-enter-active">
              {!authUser ? <LoginPage /> : <Navigate to={"/"} />}
            </div>
          } />
          <Route path="/signup" element={
            <div className="page-enter page-enter-active">
              {!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
            </div>
          } />
        </Routes>
      </div>

      {/* Enhanced Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(30, 41, 59, 0.9)',
            color: '#e2e8f0',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#06b6d4',
              secondary: '#e2e8f0',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#e2e8f0',
            },
          },
        }}
      />
    </div>
  );
}
export default App;
