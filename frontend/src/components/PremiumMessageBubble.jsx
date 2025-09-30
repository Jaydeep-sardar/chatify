import { useState, useRef, useEffect } from 'react';
import { Check, CheckCheck, Clock, Download, Eye, Heart, Share2 } from 'lucide-react';
import { PremiumEffects } from './PremiumUI';

function PremiumMessageBubble({ 
  message, 
  isOwnMessage, 
  sender, 
  onReaction, 
  onShare,
  onDownload 
}) {
  const [showActions, setShowActions] = useState(false);
  const [reactions, setReactions] = useState(message.reactions || []);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const messageRef = useRef(null);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageStatus = () => {
    if (message.isOptimistic) {
      return { icon: Clock, color: 'text-gray-400', text: 'Sending...' };
    }
    if (message.readAt) {
      return { icon: CheckCheck, color: 'text-blue-400', text: 'Read' };
    }
    if (message.deliveredAt) {
      return { icon: CheckCheck, color: 'text-gray-400', text: 'Delivered' };
    }
    return { icon: Check, color: 'text-gray-400', text: 'Sent' };
  };

  const handleReaction = (emoji) => {
    const newReaction = {
      emoji,
      userId: 'current-user',
      timestamp: new Date()
    };
    setReactions(prev => [...prev, newReaction]);
    if (onReaction) onReaction(message._id, emoji);
  };

  const popularEmojis = ['❤️', '😊', '😂', '😮', '😢', '👍', '👎', '🔥'];

  const status = getMessageStatus();
  const StatusIcon = status.icon;

  return (
    <div
      ref={messageRef}
      className={`relative group ${isOwnMessage ? 'ml-auto' : 'mr-auto'} max-w-[75%]`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <PremiumEffects effect="glow" intensity="low">
        <div
          className={`
            relative px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm
            transition-all duration-300 hover:shadow-xl
            ${isOwnMessage 
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-md' 
              : 'bg-gradient-to-br from-slate-800 to-slate-700 text-slate-100 rounded-bl-md border border-slate-600/50'
            }
            ${message.isOptimistic ? 'opacity-70 animate-pulse' : ''}
          `}
        >
          {/* Message Content */}
          <div className="relative z-10">
            {/* Image Content */}
            {message.image && (
              <div className="mb-3 relative overflow-hidden rounded-xl">
                <img
                  src={message.image}
                  alt="Shared image"
                  className={`
                    max-w-full h-auto max-h-64 object-cover cursor-pointer
                    transition-all duration-300 hover:scale-105
                    ${!isImageLoaded ? 'blur-sm' : ''}
                  `}
                  onLoad={() => setIsImageLoaded(true)}
                  onClick={() => window.open(message.image, '_blank')}
                />
                
                {/* Image Actions */}
                {isImageLoaded && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => window.open(message.image, '_blank')}
                      className="p-1.5 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
                    >
                      <Eye className="w-3 h-3 text-white" />
                    </button>
                    {onDownload && (
                      <button
                        onClick={() => onDownload(message.image)}
                        className="p-1.5 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
                      >
                        <Download className="w-3 h-3 text-white" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Text Content */}
            {message.text && (
              <div className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                {message.text}
              </div>
            )}

            {/* Message Meta */}
            <div className={`
              flex items-center justify-between mt-2 gap-2 text-xs
              ${isOwnMessage ? 'text-cyan-100' : 'text-slate-400'}
            `}>
              <span className="opacity-75">{formatTime(message.createdAt)}</span>
              
              {isOwnMessage && (
                <div className="flex items-center gap-1" title={status.text}>
                  <StatusIcon className={`w-3 h-3 ${status.color}`} />
                </div>
              )}
            </div>
          </div>

          {/* Reactions */}
          {reactions.length > 0 && (
            <div className="absolute -bottom-2 left-3 flex gap-1 z-20">
              {reactions.slice(0, 3).map((reaction, index) => (
                <div
                  key={index}
                  className="
                    bg-slate-800 rounded-full px-2 py-1 text-xs
                    border border-slate-600 shadow-lg backdrop-blur-sm
                    animate-bounce
                  "
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {reaction.emoji}
                </div>
              ))}
              {reactions.length > 3 && (
                <div className="bg-slate-800 rounded-full px-2 py-1 text-xs border border-slate-600 shadow-lg">
                  +{reactions.length - 3}
                </div>
              )}
            </div>
          )}

          {/* Shimmer Effect for Loading */}
          {message.isOptimistic && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          )}
        </div>
      </PremiumEffects>

      {/* Floating Action Menu */}
      {showActions && (
        <div className={`
          absolute top-0 z-30 flex gap-1
          ${isOwnMessage ? 'right-full mr-2' : 'left-full ml-2'}
          animate-fade-in-up
        `}>
          {/* Reaction Button */}
          <div className="relative group/reactions">
            <button className="p-2 bg-slate-800/90 rounded-full backdrop-blur-sm border border-slate-600/50 hover:bg-slate-700/90 transition-colors">
              <Heart className="w-4 h-4 text-slate-300" />
            </button>
            
            {/* Reaction Picker */}
            <div className="
              absolute bottom-full mb-2 left-1/2 -translate-x-1/2
              bg-slate-800/95 backdrop-blur-sm rounded-xl p-2 border border-slate-600/50
              flex gap-1 shadow-xl opacity-0 group-hover/reactions:opacity-100
              transition-all duration-200 pointer-events-none group-hover/reactions:pointer-events-auto
            ">
              {popularEmojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors text-lg hover:scale-125"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Share Button */}
          {onShare && (
            <button
              onClick={() => onShare(message)}
              className="p-2 bg-slate-800/90 rounded-full backdrop-blur-sm border border-slate-600/50 hover:bg-slate-700/90 transition-colors"
            >
              <Share2 className="w-4 h-4 text-slate-300" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PremiumMessageBubble;