
import React, { useState, useEffect, useRef, useContext } from 'react';
import { DoctorContext } from './../context/DoctorContext';
import axios from 'axios';
import { Send, X, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import socket from './../socket';

const PatientChatBox = ({ patientId, patientName, patientImage, isOpen, setIsOpen }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  console.log("PatientChatBox", patientId, patientName, patientImage);

  
  const { dToken, profileData } = useContext(DoctorContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  
  // Fetch chat history when component mounts
  useEffect(() => {
    if (isOpen && dToken) {
        fetchChatHistory();
        socket.connect();
        socket.emit("doctorOnline", profileData._id);

        socket.on("receiveMessage", (message) => {
          setMessages((prev) => [...prev, message]);
        });
    }
    
    return () => {
      if (isOpen) {
        socket.off("receiveMessage");
      }
    };
  }, [isOpen, patientId, dToken]);
  
  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target) && 
          !event.target.closest('.patient-chat-btn')) {

        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const fetchChatHistory = async () => {
    if (!dToken) {
      toast.warn("Please login to chat with the patient");
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/chat/${profileData._id}/${patientId}`,
        { headers: { dToken } }
      );
      
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      toast.error("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  };
  
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    if (!dToken) {
      toast.warn("Please login to chat with the patient");
      return;
    }
    
    const newMessage = {
      message: message,
      sender: 'doctor',
      timestamp: new Date().toISOString(),
      _id: 'temp-' + Date.now(),
      senderId: profileData._id,
      receiverId: patientId,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    socket.emit("sendMessage", newMessage);
    
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/chat/sendMessage`, 
        newMessage,
        { headers: { dToken } }
      );
      
      if (data.success) {
        // Replace temp message with confirmed one from server
        setMessages(prev => 
          prev.map(msg => 
            msg._id === newMessage._id ? { ...data.message } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
      // Remove the temp message in case of failure
      setMessages(prev => prev.filter(msg => msg._id !== newMessage._id));
    }
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
//   const toggleChat = () => {
//     setIsOpen(prev => !prev);
//   };
  
  return (
    <>
      {/* Chat box */}
      <div 
        ref={chatBoxRef}
        className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-[#1a1445] border-l border-white/10 shadow-xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#2a1d5d]">
          <div className="flex items-center space-x-3">
            <img 
              src={patientImage} 
              alt={patientName} 
              className="w-10 h-10 rounded-full object-cover border border-purple-300"
            />
            <div>
              <h3 className="font-semibold text-white">{patientName}</h3>
              <p className="text-xs text-gray-300">Patient</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="flex flex-col h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse text-purple-300">Loading messages...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-2">
              <MessageSquare className="w-12 h-12 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={msg._id || index} 
                className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  msg.sender === 'doctor' 
                    ? 'bg-purple-500 text-white rounded-br-none' 
                    : 'bg-white/10 text-gray-200 rounded-bl-none'
                }`}>
                  <p>{msg.message}</p>
                  <span className="text-xs opacity-70 block text-right mt-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#2a1d5d] border-t border-white/10">
          <form onSubmit={sendMessage} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              type="submit"
              className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300"
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PatientChatBox;