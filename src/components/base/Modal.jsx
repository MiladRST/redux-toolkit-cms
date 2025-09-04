
const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">&times;</button>
                </div>

                <div className="mb-4">
                    {children}
                </div>

                {footer && (
                    <div className="flex justify-end space-x-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
