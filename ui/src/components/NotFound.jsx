import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 overflow-hidden text-white">
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full opacity-10 animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 animate-pulse translate-x-1/3 translate-y-1/3"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-[10rem] font-extrabold mb-4 drop-shadow-lg">404</h1>
        <p className="text-2xl mb-6 font-semibold">Oops! The page you're looking for doesn't exist.</p>
        
        <Link
          to="/"
          className="px-6 no-underline py-3 bg-white text-red-500 font-bold rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>

      <img
        src="https://img.icons8.com/ios/250/ffffff/astronaut.png"
        alt="astronaut"
        className="absolute bottom-0 right-10 w-32 animate-bounce"
      />
    </div>
  );
};

export default NotFound;
