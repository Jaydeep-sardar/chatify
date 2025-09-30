import { Check, CheckCheck, Clock } from "lucide-react";

function MessageStatus({ message, isOwnMessage }) {
  if (!isOwnMessage) return null;

  const getStatusIcon = () => {
    if (message.isOptimistic) {
      return <Clock className="w-3 h-3 text-gray-400" />;
    }
    
    if (message.readAt) {
      return <CheckCheck className="w-3 h-3 text-blue-400" />;
    }
    
    if (message.deliveredAt) {
      return <CheckCheck className="w-3 h-3 text-gray-400" />;
    }
    
    return <Check className="w-3 h-3 text-gray-400" />;
  };

  const getStatusText = () => {
    if (message.isOptimistic) return "Sending...";
    if (message.readAt) return "Read";
    if (message.deliveredAt) return "Delivered";
    return "Sent";
  };

  return (
    <div className="flex items-center gap-1 text-xs text-gray-400" title={getStatusText()}>
      {getStatusIcon()}
      <span className="text-[10px]">
        {new Date(message.createdAt).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </span>
    </div>
  );
}

export default MessageStatus;