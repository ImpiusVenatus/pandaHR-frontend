"use client";
import { FaRocket, FaShieldAlt, FaCogs, FaUsers, FaRegLightbulb, FaSmile } from "react-icons/fa"; // More icons from react-icons

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
    {
      icon: <FaUsers className="text-purple-600 text-5xl" />,
      title: "User-Friendly",
      description:
        "Our interface is intuitive and easy to navigate, ensuring a smooth experience for users of all technical levels.",
    },
    {
      icon: <FaRegLightbulb className="text-purple-600 text-5xl" />,
      title: "Innovative Technology",
      description:
        "We leverage cutting-edge technology to offer the most innovative features, making your business processes more efficient.",
    },
    {
      icon: <FaSmile className="text-purple-600 text-5xl" />,
      title: "Customer Support",
      description:
        "Our dedicated support team is available 24/7 to assist you with any questions or issues you may have.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 font-zrnic">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col bg-white p-6 rounded-lg shadow-lg"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 font-dmSans-bold">{feature.title}</h3>
              <p className="text-gray-600 mt-2 font-dmSans">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
