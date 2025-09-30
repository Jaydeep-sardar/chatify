import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 border-t border-slate-600/30 glass-effect">
      {imagePreview && (
        <div className="max-w-4xl mx-auto mb-4 animate-fade-in-up">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border-2 border-slate-600/50 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:scale-105"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500/90 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500 transition-all duration-200 hover:scale-110 shadow-lg"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-4 p-4 glass-strong rounded-2xl shadow-2xl">
          {/* Enhanced Message Input */}
          <div className="flex-1 relative group">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                isSoundEnabled && playRandomKeyStrokeSound();
              }}
              className="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl py-4 px-6 text-slate-200 placeholder-slate-400 
                         focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:bg-slate-800/80
                         transition-all duration-300 ease-in-out
                         hover:border-slate-500/60 hover:bg-slate-800/70 hover:shadow-glow
                         resize-none max-h-32 min-h-[3.5rem] scrollbar-premium
                         backdrop-blur-sm"
              placeholder="Type your message... ✨"
              rows="1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            
            {/* Enhanced typing indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full transition-all duration-500 ease-out transform scale-x-0 group-focus-within:scale-x-100 origin-left" />
            
            {/* Character count indicator */}
            {text.length > 50 && (
              <div className="absolute -bottom-6 right-2 text-xs text-slate-500">
                {text.length}/1000
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Premium Image Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-3 rounded-xl transition-all duration-300 ease-out hover:scale-110 active:scale-95 interactive-hover ${
              imagePreview 
                ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50 shadow-glow" 
                : "bg-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-slate-600/50 border border-slate-600/40"
            }`}
            title="Upload image"
          >
            <ImageIcon className={`w-5 h-5 transition-all duration-300 ${imagePreview ? 'scale-110 animate-pulse' : ''}`} />
          </button>

          {/* Premium Send Button */}
          <button
            type="submit"
            disabled={!text.trim() && !imagePreview}
            className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold 
                       hover:from-cyan-400 hover:to-blue-400 hover:scale-110 active:scale-95
                       focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-slate-800
                       transition-all duration-300 ease-out
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       shadow-glow hover:shadow-glow-strong
                       relative overflow-hidden group interactive-hover"
          >
            <SendIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
      </form>
    </div>
  );
}
export default MessageInput;
