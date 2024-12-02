"use client";
import Image from "next/image";

const EmployeeAnalyticsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center">
        {/* Image on the left */}
        <div className="md:w-1/2 flex justify-center px-4">
          <Image
            src="/contents/analytics.jpg"
            alt="Employee Analytics"
            width={1800}
            height={1200}
            className="rounded-lg"
          />
        </div>

        {/* Content on the right */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-5xl leading-[5rem] font-semibold text-black font-zrnic">Employee Analytics</h2>
          <p className="font-dmSans">
            Our product offers comprehensive employee analytics, providing insights into workforce productivity,
            engagement, and performance. With real-time data, managers can make informed decisions to improve
            employee satisfaction and optimize team performance.
          </p>
          <ul className="font-dmSans list-disc pl-5 space-y-2">
            <li><strong className="font-dmSans-bold">Real-Time Metrics:</strong> Track employee performance and engagement as it happens.</li>
            <li><strong className="font-dmSans-bold">Productivity Insights:</strong> Get actionable data on how employees are spending their time.</li>
            <li><strong className="font-dmSans-bold">Employee Satisfaction:</strong> Monitor employee well-being and satisfaction through surveys and feedback.</li>
            <li><strong className="font-dmSans-bold">Custom Reports:</strong> Generate detailed reports tailored to your organization's needs.</li>
          </ul>
          <p className="font-dmSans pb-8">
            With our advanced analytics tools, you can drive better decision-making, foster a positive work culture, and
            ensure your team is always aligned with company goals.
          </p>
          <a
            href="#"
            className="bg-purple-700 font-dmSans-bold text-white py-4 px-6 rounded hover:bg-white hover:text-purple-700 hover:bg-transparent border border-purple-700 transition duration-300"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
};

export default EmployeeAnalyticsSection;
