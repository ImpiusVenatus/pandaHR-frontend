"use client";
import Image from "next/image";

const TimeAndAttendeeSection = () => {
  return (
    <section id="time-attendee" className="py-16 px-4 bg-white">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
        {/* Content on the left */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-5xl font-semibold text-black font-zrnic">
            Time and Attendance Management
          </h2>
          <p className="font-dmSans">
            Efficiently track employee attendance and manage work hours with ease. Our system streamlines the
            recording of time logs and attendance, making it simple to monitor workforce schedules and ensure compliance.
          </p>
          <ul className="font-dmSans list-disc pl-5 space-y-2">
            <li>
              <strong className="font-dmSans-bold">Automated Tracking:</strong> Record attendance with minimal effort using smart integrations.
            </li>
            <li>
              <strong className="font-dmSans-bold">Real-Time Monitoring:</strong> Access live updates on employee check-ins and check-outs.
            </li>
            <li>
              <strong className="font-dmSans-bold">Customizable Schedules:</strong> Create and manage shifts and schedules tailored to your team.
            </li>
            <li>
              <strong className="font-dmSans-bold">Detailed Analytics:</strong> Gain insights into attendance trends and overtime hours.
            </li>
          </ul>
          <p className="font-dmSans pb-8">
            With our time and attendance solution, your organization can boost productivity while minimizing
            manual errors and administrative tasks.
          </p>
          <a
            href="#"
            className="bg-[#7152f3] font-dmSans-bold text-white py-4 px-6 rounded hover:bg-white hover:text-[#7152f3] hover:bg-transparent border border-[#7152f3] transition duration-300"
          >
            View More
          </a>
        </div>

        {/* Image on the right */}
        <div className="md:w-1/2 flex justify-center px-4">
          <Image
            src="/contents/time-leave.jpg"
            alt="Time and Attendance"
            width={1800}
            height={1200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default TimeAndAttendeeSection;
