import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import QuizLogo from "@/components/QuizLogo";
import ProgressBar from "@/components/ProgressBar";
import OptionCard from "@/components/OptionCard";

const TOTAL_STEPS = 16; // steps 2-17 for progress bar (step 1 has no bar)

const Index = () => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [course, setCourse] = useState("");
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [animKey, setAnimKey] = useState(0);

  const goNext = useCallback(() => {
    setStep((s) => s + 1);
    setAnimKey((k) => k + 1);
  }, []);

  const selectOption = useCallback(
    (stepNum: number, value: string) => {
      setSelections((s) => ({ ...s, [stepNum]: value }));
      setTimeout(() => goNext(), 300);
    },
    [goNext]
  );

  return (
    <div className="min-h-screen quiz-gradient flex flex-col items-center">
      <div className="w-full max-w-[480px] px-4 pb-8 flex flex-col min-h-screen">
        <QuizLogo />
        {step > 1 && step <= 16 && (
          <div className="mb-6">
            <ProgressBar current={Math.min(step - 1, TOTAL_STEPS)} total={TOTAL_STEPS} />
          </div>
        )}

        <div key={animKey} className="animate-slide-in flex-1">
          {step === 1 && <Step1 onNext={goNext} />}
          {step === 2 && <Step2 userName={userName} setUserName={setUserName} onNext={goNext} />}
          {step === 3 && <Step3 selected={selections[3]} onSelect={(v) => selectOption(3, v)} />}
          {step === 4 && <Step4 course={course} setCourse={setCourse} onNext={goNext} />}
          {step === 5 && <Step5 selected={selections[5]} onSelect={(v) => selectOption(5, v)} />}
          {step === 6 && <Step6 selected={selections[6]} onSelect={(v) => selectOption(6, v)} />}
          {step === 7 && <Step7 onNext={goNext} />}
          {step === 8 && <Step8 selected={selections[8]} onSelect={(v) => selectOption(8, v)} />}
          {step === 9 && <Step9 selected={selections[9]} onSelect={(v) => selectOption(9, v)} />}
          {step === 10 && <Step10 selected={selections[10]} onSelect={(v) => selectOption(10, v)} />}
          {step === 11 && <Step11 selected={selections[11]} onSelect={(v) => selectOption(11, v)} />}
          {step === 12 && <Step12 onNext={goNext} />}
          {step === 13 && <Step13 selected={selections[13]} onSelect={(v) => selectOption(13, v)} />}
          {step === 14 && <Step14 selected={selections[14]} onSelect={(v) => selectOption(14, v)} />}
          {step === 15 && <Step15 selected={selections[15]} onSelect={(v) => selectOption(15, v)} />}
          {step === 16 && <Step16 selected={selections[16]} onSelect={(v) => selectOption(16, v)} />}
          {step === 17 && <Step17 userName={userName.trim().replace(/\s+/g, ' ')} course={course.trim().replace(/\s+/g, ' ')} />}
        </div>

        <footer className="text-muted-foreground text-xs text-center mt-8 pb-4">
          <p>2026 © Studio Luna</p>
          <p>Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  );
};

/* ─── STEP COMPONENTS ─── */

const CTAButton = ({
  onClick,
  disabled,
  children,
  className = "",
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-4 rounded-xl text-base quiz-btn transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

const StepTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-foreground text-lg font-bold mb-4 leading-snug text-center">{children}</h2>
);

/* Step 1 */
const Step1 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col gap-5">
    <h1 className="text-foreground text-xl font-bold leading-tight text-center">
      Análise de Perfil e Disponibilidade
    </h1>
    <p className="text-muted-foreground text-sm leading-relaxed text-center">
      Por conta da demanda e para mantermos o nível de qualidade e cuidado com os ensaios produzidos,
      {" "}<span className="glow-text">ABRIMOS APENAS 17 VAGAS</span>{" "}
      para novos formandos por semana. Preencha o teste abaixo para
      verificarmos o seu perfil e quantas vagas disponíveis temos para o seu ensaio de formatura.
    </p>
    <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
      <img
        src="https://i.ibb.co/SXqNXmry/foto1.webp"
        alt="Studio Luna ensaio"
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-muted-foreground text-xs text-center">⏱ A avaliação leva menos de 2 minutos.</p>
    <CTAButton onClick={onNext}>Iniciar Avaliação →</CTAButton>
  </div>
);

/* Step 2 */
const Step2 = ({
  userName,
  setUserName,
  onNext,
}: {
  userName: string;
  setUserName: (v: string) => void;
  onNext: () => void;
}) => (
  <div className="flex flex-col gap-5">
    <StepTitle>Para começarmos, qual é o seu nome?</StepTitle>
    <input
      type="text"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      placeholder="Digite seu nome aqui"
      className="w-full p-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
    />
    <CTAButton onClick={onNext} disabled={!userName.trim()}>
      Continuar →
    </CTAButton>
  </div>
);

/* Step 3 */
const Step3 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>
      Nossa tecnologia precisa mapear seus traços faciais com extrema precisão. Você possui de 3 a 5
      selfies recentes, bem iluminadas, nítidas e sem acessórios (como óculos escuros ou boné/chapéu)?
    </StepTitle>
    {["✅ Sim, tenho essas fotos prontas.", "🤳 Não tenho agora, mas posso tirar na hora."].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 4 */
const Step4 = ({
  course,
  setCourse,
  onNext,
}: {
  course: string;
  setCourse: (v: string) => void;
  onNext: () => void;
}) => (
  <div className="flex flex-col gap-5">
    <StepTitle>Em qual curso você está se formando ou já se formou?</StepTitle>
    <input
      type="text"
      value={course}
      onChange={(e) => setCourse(e.target.value)}
      placeholder="Ex: Medicina, Direito, Engenharia..."
      className="w-full p-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
    />
    <CTAButton onClick={onNext} disabled={!course.trim()}>
      Continuar →
    </CTAButton>
  </div>
);

/* Step 5 */
const Step5 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>
      O quanto você conhece sobre a tecnologia de Fotorrealismo Digital (a nova era dos ensaios de luxo)?
    </StepTitle>
    {[
      "🙋 Já vi resultados e fiquei impressionado(a).",
      "😕 Já tentei fazer mas não gostei do resultado",
      "🤔 Vi agora e quero saber se o realismo é tudo isso mesmo.",
    ].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 6 */
const Step6 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>Você já viu como os ensaios com IA viraram uma nova tendência?</StepTitle>
    {[
      "✨ Sim, tá todo mundo fazendo!",
      "👀 Já vi alguns no meu feed.",
      "🤔 Ainda não... Me mostra?",
    ].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 7 */
const Step7 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col gap-5">
    <StepTitle>
      Consegue acreditar que essas fotos produzidas pelo Studio Luna não precisaram de um estúdio físico? 👇
    </StepTitle>
    <div className="grid grid-cols-2 gap-3">
      {[
        "https://i.ibb.co/mVScv8Q8/1.webp",
        "https://i.ibb.co/dwsM6j87/2.webp",
        "https://i.ibb.co/p6mKYfcR/3.webp",
        "https://i.ibb.co/dwsM6j87/2.webp",
      ].map((src, i) => (
        <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img src={src} alt={`Ensaio ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
    <p className="text-muted-foreground text-sm text-center leading-relaxed">
      Nossos resultados impressionam as pessoas que, assim como você, entenderam que essa conquista merece
      ser eternizada com estilo.
    </p>
    <CTAButton onClick={onNext}>Continuar avaliação →</CTAButton>
  </div>
);

/* Step 8 */
const Step8 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>Quando você imagina seu ensaio de formatura, o que mais importa?</StepTitle>
    {[
      "💎 Status e Impacto: Fotos que param o feed do Instagram.",
      "🎓 Legado: Um registro à altura do esforço que foi chegar até aqui.",
      "✨ Praticidade: Ter o ensaio dos sonhos sem perder dinheiro e horas do meu dia.",
    ].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 9 */
const Step9 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>Você acredita que um ensaio de formatura bem feito é:</StepTitle>
    {[
      "💎 Essencial, se faz poucas vezes na vida",
      "⚖️ Importante mas depende do preço",
      "🙂 Algo simples já resolve",
    ].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 10 */
const Step10 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>
      Na sua cidade, quanto você acha que custa um ensaio de formatura profissional em estúdio?
    </StepTitle>
    {[
      "💲 R$ 300 a R$ 600",
      "💲💲 R$ 600 a R$ 1.000",
      "💲💲💲 R$ 1.000 a R$ 2.000",
    ].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 11 */
const Step11 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>Quando você receber o seu ensaio, você vai querer ver:</StepTitle>
    {[
      "🌟 Um realismo absoluto, mesmo que eu tenha investido um pouco mais",
      "👍 Uma qualidade boa, visando o meu custo-benefício",
      "💸 Um resultado condizente com o que coube no meu bolso",
    ].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 12 */
const Step12 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col gap-5">
    <h2 className="text-foreground text-lg font-bold leading-snug">
      O Studio Luna se destaca nessa nova tendência que já até virou notícia no Brasil todo! 👇
    </h2>
    <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "9/16" }}>
      <img
        src="https://i.ibb.co/NdqbKDJw/noticia.webp"
        alt="Notícia Studio Luna"
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-muted-foreground text-sm text-center leading-relaxed">
      E é exatamente esse nível de entrega que estamos avaliando para você agora.
    </p>
    <CTAButton onClick={onNext}>Continuar →</CTAButton>
  </div>
);

/* Step 13 */
const Step13 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>Qual estilo de ensaio combina mais com você?</StepTitle>
    {[
      "✨ Elegante e sofisticado",
      "🌿 Natural e leve",
      "🎨 Criativo e diferente",
      "🎓 Clássico tradicional",
    ].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 14 */
const Step14 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>Como você prefere que seja o seu cenário?</StepTitle>
    <div className="grid grid-cols-2 gap-3">
      {[
        {
          value: "estudio",
          img: "https://i.ibb.co/qYqQMQfQ/estudio.webp",
          label: "Estúdio 📸",
          sub: "Ambiente controlado e elegante",
        },
        {
          value: "externo",
          img: "https://i.ibb.co/Y4B8wPNw/externo.webp",
          label: "Externo 🌳",
          sub: "Luz natural e cenários reais",
        },
      ].map((c) => (
        <button
          key={c.value}
          onClick={() => onSelect(c.value)}
          className={`relative rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 ${
            selected === c.value
              ? "ring-2 ring-accent shadow-[0_0_20px_var(--quiz-glow)]"
              : "quiz-card"
          }`}
          style={{ hover: { boxShadow: "0 0 15px var(--quiz-glow)" } } as any}
        >
          {selected === c.value && (
            <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs text-foreground font-bold">
              ✓
            </div>
          )}
          <div style={{ aspectRatio: "3/4" }} className="overflow-hidden rounded-t-xl">
            <img src={c.img} alt={c.label} className="w-full h-full object-cover" />
          </div>
          <div className="p-3 text-center">
            <p className="text-foreground font-bold text-sm">{c.label}</p>
            <p className="text-muted-foreground text-xs mt-1">{c.sub}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

/* Step 15 */
const Step15 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>Para calcularmos os prazos da produção, quando será (ou foi) sua formatura?</StepTitle>
    {[
      "⏰ Ainda esse mês",
      "📅 Nos próximos 3 meses",
      "🗓️ Final do ano / ano que vem",
      "🎉 Já aconteceu",
    ].map((o) => (
      <OptionCard key={o} text={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

/* Step 16 */
const Step16 = ({ selected, onSelect }: { selected?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-col gap-4">
    <StepTitle>
      Você entende que este é um serviço personalizado de altíssima qualidade e que, caso seu perfil seja
      aprovado, você precisará enviar suas fotos para o nosso Especialista no WhatsApp para garantir a sua
      vaga?
    </StepTitle>
    <OptionCard
      text="✅ Sim, eu entendo e me comprometo a enviar as fotos."
      selected={selected === "sim"}
      onClick={() => onSelect("sim")}
    />
  </div>
);

/* Step 17 - Result */
const Step17 = ({ userName, course }: { userName: string; course: string }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [btnEnabled, setBtnEnabled] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / 6000) * 100, 100);
      setProgress(pct);

      if (elapsed < 2500) {
        setMessage(`Analisando perfil de ${userName}...`);
      } else if (elapsed < 6000) {
        setMessage(`Verificando disponibilidade para ensaios de ${course}...`);
      }

      if (elapsed >= 6000) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [userName, course]);

  useEffect(() => {
    if (!loading) {
      // Fire confetti
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } }), 300);

      const timer = setTimeout(() => {
        setBtnEnabled(true);
      }, 90000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6 py-12">
        <p className="text-foreground text-sm font-medium animate-fade-in text-center">{message}</p>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%`, background: "var(--quiz-cta)" }}
          />
        </div>
      </div>
    );
  }

  const whatsappUrl =
    "https://wa.me/5511980783213?text=Ol%C3%A1!%20Acabei%20de%20fazer%20a%20avalia%C3%A7%C3%A3o%20do%20Studio%20Luna%20e%20meu%20perfil%20foi%20APROVADO!%20%F0%9F%8E%89%20Quero%20reivindicar%20minha%20vaga%20para%20o%20ensaio.";

  return (
    <div className="flex flex-col gap-5 animate-fade-in text-center">
      <h2 className="text-foreground text-xl font-bold leading-snug text-center">
        Parabéns, <span className="glow-text">{userName}</span>!<br />
        Seu perfil foi <span className="glow-text">APROVADO</span>!
      </h2>

      <p className="text-foreground text-sm leading-relaxed text-center">
        Suas preferências, juntamente ao seu perfil, atendem aos requisitos das{" "}
        <span className="glow-text">2 VAGAS</span> que temos disponíveis. Liberamos nossa fila de produção e reservamos{" "}
        <span className="glow-text">1 VAGA EXCLUSIVA</span> para o seu ensaio de formatura do curso de{" "}
        <span className="glow-text">{course}</span>.
      </p>
      <p className="text-foreground text-sm leading-relaxed text-center">
        ⚠️ <span className="glow-text">ATENÇÃO</span>: Sua vaga na fila de produção está garantida por apenas{" "}
        <span className="glow-text">1 HORA</span>. Como logo haverá outras pessoas com acesso a esse teste, reivindique sua vaga agora para não ficar de fora!
      </p>

      <p className="text-foreground font-bold text-base text-center">
        Assista o vídeo abaixo para liberar o WhatsApp de um dos nossos especialistas 👇
      </p>

      <iframe
        src="https://www.youtube.com/embed/HEHYzTP6Cbc"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: "100%", aspectRatio: "9/16", borderRadius: "12px", marginTop: "4px" }}
      />

      {btnEnabled ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-xl text-base text-center quiz-btn-green block transition-all duration-200"
        >
          RESGATAR MEU ENSAIO!
        </a>
      ) : (
        <button
          disabled
          className="w-full py-4 rounded-xl text-base quiz-btn transition-all duration-200"
        >
          ASSISTA PARA LIBERAR SUA VAGA
        </button>
      )}
    </div>
  );
};

export default Index;
