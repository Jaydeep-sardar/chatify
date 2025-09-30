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
    <div className="p-6 border-t border-slate-700/50 bg-gradient-to-t from-slate-800/30 to-transparent backdrop-blur-sm">
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
        <div className="flex items-end space-x-4 p-3 bg-slate-800/40 rounded-2xl border border-slate-700/30 backdrop-blur-sm shadow-xl">
          {/* Message Input */}
          <div className="flex-1 relative group">
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                isSoundEnabled && playRandomKeyStrokeSound();
              }}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-400 
                         focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:bg-slate-700/70
                         transition-all duration-300 ease-in-out
                         hover:border-slate-500/70 hover:bg-slate-700/60
                         resize-none max-h-32 min-h-[3rem]"
              placeholder="Type your message..."
              rows="1"
            />
            {/* Typing indicator line */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ease-out"
                 style={{width: text.length > 0 ? '100%' : '0%'}} />
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Image Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-3 rounded-xl transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${
              imagePreview 
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20" 
                : "bg-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/70 border border-slate-600/50"
            }`}
          >
            <ImageIcon className={`w-5 h-5 transition-transform duration-300 ${imagePreview ? 'scale-110' : ''}`} />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() && !imagePreview}
            className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium 
                       hover:from-cyan-600 hover:to-blue-600 hover:scale-110 active:scale-95
                       focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-slate-800
                       transition-all duration-300 ease-in-out
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30
                       relative overflow-hidden group"
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
