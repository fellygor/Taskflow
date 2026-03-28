function LoadingSpinner({ size = "h-5 w-5", color = "border-white" }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${size} border-2 ${color} border-t-transparent rounded-full animate-spin`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;