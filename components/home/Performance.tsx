"use client";
import Image from "next/image";

const PerformanceSection = () => {
  return (
    <section id="performance-analytics" className="py-16 px-4">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center">
        {/* Image on the left */}
        <div className="md:w-1/2 flex justify-center px-4">
          <Image
            src="/contents/performance.jpg"
            alt="Employee Analytics"
            width={1800}
            height={1200}
            className="rounded-lg"
          />
        </div>

        {/* Content on the right */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-5xl font-semibold font-zrnic">
            Performance Analytics
          </h2>
          <p className="font-dmSans">
            Drive informed decision-making with our advanced performance analytics. Get detailed insights into employee productivity, project progress, and organizational growth, enabling you to identify trends and optimize performance.
          </p>
          <ul className="font-dmSans list-disc pl-5 space-y-2">
            <li>
              <strong className="font-dmSans-bold">Employee Performance Metrics:</strong> Measure individual and team performance against key goals.
            </li>
            <li>
              <strong className="font-dmSans-bold">Custom Dashboards:</strong> Create personalized dashboards to monitor the metrics that matter to you.
            </li>
            <li>
              <strong className="font-dmSans-bold">Real-Time Data:</strong> Access up-to-date performance data to make timely adjustments.
            </li>
            <li>
              <strong className="font-dmSans-bold">Predictive Insights:</strong> Utilize AI-driven analytics to forecast future trends and outcomes.
            </li>
          </ul>
          <p className="font-dmSans pb-8">
            With our performance analytics, you can empower your workforce and streamline processes to achieve unparalleled success.
          </p>
          <a
            href="#"
            className="bg-[#7152f3] font-dmSans-bold text-white py-4 px-6 rounded hover:bg-white hover:text-[#7152f3] hover:bg-transparent border border-[#7152f3] transition duration-300"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
