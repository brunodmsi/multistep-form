import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { animated } from 'react-spring';

import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastProps> = ({ style, message }) => {
  const { removeToast } = useToast();
  console.log(message);

  const getIcon = (type: string = 'info', hasDescription: boolean) => {
    let className = 'mr-3';
    if (hasDescription) {
      className = `${className} mt-1`
    }

    if (type === 'info')
      return <FiInfo size={24} className={className} />
    if (type === 'success')
      return <FiCheckCircle size={24} className={className} />
    if (type === 'error')
      return <FiAlertCircle size={24} className={className} />
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <animated.div
      key={message.id}
      className={`
        w-96 relative pl-4 pr-8 pt-4 pb-4 shadow-black rounded-md flex mt-8
        ${message.type === 'info' || !message.type ? ' bg-blue-100 text-blue-500': ''}
        ${message.type === 'success' ? ' bg-green-100 text-green-500': ''}
        ${message.type === 'error' ? ' bg-red-100 text-red-500': ''}
      `}
      style={style}
    >
      {getIcon(message.type, !!message.description)}

      <div className="flex-1">
        <strong>{message.title}</strong>
        {message.description && <p className="text-sm mt-1 opacity-80 leading-5">{message.description}</p>}
      </div>

      <button 
        type="button" 
        onClick={() => removeToast(message.id)}
        className="absolute right-4 top-5 opacity-60 border-none bg-transparent text-inherit"   
      >
        <FiXCircle size={18} />
      </button>
    </animated.div>
  );
};

export default Toast;
