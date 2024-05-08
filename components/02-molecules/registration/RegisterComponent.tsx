import BackButton from "@/components/01-atoms/BackButton";
import NextButton from "@/components/01-atoms/NextButton";

interface RegisterComponentProps {
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

export default function RegisterComponent({
  handlePreviousStep,
  handleNextStep,
}: RegisterComponentProps) {
  return (
    <div className="flex flex-col gap-[44px] justify-start items-start">
      <BackButton onClick={handlePreviousStep} />
      <div className="max-w-[500px] w-full flex items-start flex-col gap-4">
        <h3 className="text-[72px]">🎉</h3>
        <h3 className="text-start text-[34px] font-medium">
          Congrats! You&apos;re now owner of isadoranunes.eth
        </h3>
        <p className="text-gray-500 text-left text-[16px]">
          Your name was successfully registered, you can now view and manage it.
        </p>
      </div>
      <NextButton onClick={handleNextStep} />
    </div>
  );
}
