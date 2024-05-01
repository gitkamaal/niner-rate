import React from 'react';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg">{message}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="btn mr-2 text-gray-700 bg-gray-600 hover:bg-gray-400 px-4 py-2 rounded-md">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn text-white bg-red-300 hover:bg-red-500 px-4 py-2 rounded-md">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
