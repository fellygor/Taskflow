import  LoadingSpinner  from '../components/LoadingSpinner';

export default function Button({ text, onClick, type = "button", isLoading, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all 
        ${isLoading || disabled 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg active:scale-95"
        } flex justify-center items-center gap-2`}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="h-5 w-5" />
          <span>Processing...</span>
        </>
      ) : (
        text
      )}
    </button>
  );
}