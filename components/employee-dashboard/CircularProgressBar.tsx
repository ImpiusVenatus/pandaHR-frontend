import { motion } from "framer-motion";

interface CircularProgressBarProps {
  progress: number; // 0 to 100
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
  const strokeDashoffset = 100 - progress; // Calculate the offset for animation

  return (
    <div className="relative w-24 h-24">
      <svg
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="text-gray-200 dark:text-gray-700"
          fill="none"
          strokeWidth="3"
          d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
        />
        <motion.path
          className="text-[#7152F3]"
          fill="none"
          strokeWidth="3"
          strokeDasharray="100, 100"
          strokeDashoffset={strokeDashoffset}
          d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#7152F3]">
        {progress}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
