interface OptionCardProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const OptionCard = ({ text, selected, onClick }: OptionCardProps) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
      selected ? "quiz-card-selected" : "quiz-card"
    } hover:scale-[1.02]`}
  >
    <div className="flex items-center justify-between">
      <span className="text-foreground text-sm leading-relaxed">{text}</span>
      {selected && <span className="text-foreground ml-2 text-lg">✓</span>}
    </div>
  </button>
);

export default OptionCard;
