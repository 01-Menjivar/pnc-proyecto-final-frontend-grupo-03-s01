const StepInfoCard = ({ stepData }) => {
  const { icon: StepIcon, title, subtitle, bgColor, borderColor, color } = stepData;

  return (
    <div className={`rounded-lg border-2 p-4 mb-6 transition-all duration-300 ${bgColor} ${borderColor}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-all duration-300 ${color} text-white`}>
          <StepIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default StepInfoCard;