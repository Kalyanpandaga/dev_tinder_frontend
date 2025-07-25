import React from "react";

const Premium = () => {
  const plans = [
    {
      name: "Gold Membership",
      price: "₹3999",
      duration: "6 Months",
      features: [
        "Unlimited Chat Access",
        "Priority Matching",
        "Exclusive Premium Badge",
        "Profile Boosts Every Week",
      ],
      color: "from-yellow-200 to-yellow-400", // Softer pastel gold
      buttonColor: "btn-warning", // Darker gold button
    },
    {
      name: "Silver Membership",
      price: "₹2399",
      duration: "3 Months",
      features: [
        "20 Chats Per Day",
        "Basic Matching",
        "Standard Support",
        "Profile Visibility Boost (Monthly)", // New feature to balance height
      ],
      color: "from-gray-200 to-gray-400", // Softer silver
      buttonColor: "btn-info",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-20 px-4">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`flex flex-col justify-between bg-gradient-to-br ${plan.color} rounded-xl shadow-md p-6 w-full max-w-sm sm:max-w-md lg:max-w-sm hover:scale-105 transition-transform duration-300`}
        >
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {plan.name}
            </h2>
            <p className="text-gray-800 text-base sm:text-lg">
              {plan.duration} •{" "}
              <span className="font-semibold">{plan.price}</span>
            </p>
          </div>

          <ul className="text-gray-800 mb-6 space-y-2 text-sm sm:text-base">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-blue-500 text-lg">✔</span> {feature}
              </li>
            ))}
          </ul>

          <button
            className={`btn w-full font-semibold ${
              plan.buttonColor.includes("btn-")
                ? plan.buttonColor
                : `${plan.buttonColor}`
            }`}
          >
            Buy {plan.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Premium;
