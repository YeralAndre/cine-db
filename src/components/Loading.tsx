export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-32">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"></div>
        <div
          className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}
