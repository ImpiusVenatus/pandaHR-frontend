"use client";
import { FaRocket, FaShieldAlt, FaCogs } from "react-icons/fa"; // Example icons from react-icons

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaRocket className="text-purple-600 text-5xl" />,
      title: "High Performance",
      description:
        "Our product is optimized for speed and efficiency, ensuring seamless user experiences even under heavy workloads.",
    },
    {
      icon: <FaShieldAlt className="text-purple-600 text-5xl" />,
      title: "Robust Security",
      description:
        "We prioritize security with advanced encryption and protection, keeping your data safe at all times.",
    },
    {
      icon: <FaCogs className="text-purple-600 text-5xl" />,
      title: "Customizability",
      description:
        "Easily adapt our product to fit your unique needs with a wide range of customization options.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
