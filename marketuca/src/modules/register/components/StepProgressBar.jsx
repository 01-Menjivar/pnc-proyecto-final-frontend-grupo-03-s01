const StepProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index + 1}
          className={`flex-1 h-2 rounded-full transition-all duration-300 ${
            index + 1 <= currentStep ? 'bg-[#0056b3]' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default StepProgressBar;