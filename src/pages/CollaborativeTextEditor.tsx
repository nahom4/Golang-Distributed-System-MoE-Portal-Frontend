import { useEffect, useState, useRef } from "react";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { 
  Users, 
  Wifi, 
  WifiOff, 
  FileText, 
  Clock,
  Save,
  Activity
} from "lucide-react";

interface CollaborativeTextEditorProps {
  title: string;
}

function CollaborativeTextEditor({ title }) {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [wordCount, setWordCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [content, setContent] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    function connectWebSocket() {
      setConnectionStatus('connecting');
      
      const socket = new WebSocket(
        `wss://golang-distributed-system-moe-portal.onrender.com/ws?document=${title}&Latitude=10&Longitude=20`
      );
      
      socketRef.current = socket;

      socket.onopen = function () {
        setConnectionStatus('connected');
        console.log("WebSocket connection established.");
      };

      socket.onmessage = function (event) {
        console.log("Received message:", event.data);
        if (textAreaRef.current) {
          const newContent = event.data;
          textAreaRef.current.value = newContent;
          setContent(newContent);
          setWordCount(newContent.trim().split(/\s+/).filter(word => word.length > 0).length);
          setLastSaved(new Date());
        }
      };

      socket.onerror = function (error) {
        console.error("WebSocket error:", error);
        setConnectionStatus('disconnected');
      };

      socket.onclose = function () {
        console.log("WebSocket connection closed. Reconnecting...");
        setConnectionStatus('disconnected');
        setTimeout(connectWebSocket, 2000);
      };
    }

    connectWebSocket();

    const handleTextAreaInput = (event) => {
      const target = event.target ;
      const text = target.value;
      setContent(text);
      setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
      
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(text);
        setLastSaved(new Date());
      } else {
        console.error("WebSocket connection is not open.");
      }
    };

    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.addEventListener("input", handleTextAreaInput);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (textArea) {
        textArea.removeEventListener("input", handleTextAreaInput);
      }
    };
  }, [title]);

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-emerald-600" />;
      case 'connecting':
        return <Activity className="h-4 w-4 text-amber-500 animate-pulse" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />;
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Reconnecting...';
    }
  };

  const getConnectionBadgeClass = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'connecting':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'disconnected':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-emerald-50/50 to-white">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Collaborative Editor</h3>
              <p className="text-xs text-gray-500">Real-time document editing</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Word Count */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">{wordCount}</span>
            <span>words</span>
          </div>
          
          {/* Last Saved */}
          {lastSaved && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Save className="h-3 w-3" />
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          
          {/* Connection Status */}
          <Badge className={`text-xs px-2 py-1 ${getConnectionBadgeClass()}`}>
            <div className="flex items-center gap-1">
              {getConnectionIcon()}
              <span>{getConnectionText()}</span>
            </div>
          </Badge>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative">
        <textarea
          ref={textAreaRef}
          id="editor"
          placeholder="Start writing your petition content here... Your changes will be saved automatically and synced with other collaborators in real-time."
          className="w-full h-full resize-none border-0 outline-0 p-6 bg-transparent text-gray-900 placeholder-gray-400 leading-relaxed focus:ring-0"
          style={{ 
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7'
          }}
        />
        
        {/* Collaborative Indicators */}
        <div className="absolute bottom-4 left-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live collaboration enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Footer */}
      <div className="border-t border-emerald-100 bg-emerald-50/30 px-6 py-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 text-emerald-600" />
              <span>Multi-user editing</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-emerald-600" />
              <span>Auto-save enabled</span>
            </div>
          </div>
          
          <div className="text-gray-500">
            Document: {title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollaborativeTextEditor;