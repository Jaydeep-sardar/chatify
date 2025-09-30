import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="relative p-4">
      <div className="flex bg-slate-800/50 rounded-xl p-1 backdrop-blur-sm border border-slate-700/30">
        {/* Background slider */}
        <div 
          className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-lg transition-all duration-300 ease-out border border-cyan-500/50 shadow-lg ${
            activeTab === "contacts" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        
        <button
          onClick={() => setActiveTab("chats")}
          className={`relative z-10 flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 ${
            activeTab === "chats" 
              ? "text-cyan-300 shadow-glow" 
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          💬 Chats
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`relative z-10 flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 ${
            activeTab === "contacts" 
              ? "text-cyan-300 shadow-glow" 
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          👥 Contacts
        </button>
      </div>
    </div>
  );
}
export default ActiveTabSwitch;
