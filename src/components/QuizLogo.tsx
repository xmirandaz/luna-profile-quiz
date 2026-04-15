import { useState } from "react";

const QuizLogo = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex justify-center pt-5 mb-3">
      {imgError ? (
        <span className="text-foreground font-bold text-lg">Studio Luna</span>
      ) : (
        <img
          src="https://i.ibb.co/fdMzL02L/logo.webp"
          alt="Studio Luna"
          className="h-[50px] w-auto object-contain"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
};

export default QuizLogo;
