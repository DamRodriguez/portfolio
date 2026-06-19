import { AnimatedDigit } from "@/components/motion/AnimatedDigit";

export const AnimatedNumber = ({
  value,
  minDigits = 2,
}: {
  value: number;
  minDigits?: number;
}) => {
  const digits = value.toString().padStart(minDigits, "0").split("");

  return (
    <span className="inline-flex">
      {digits.map((digit, index) => (
        <AnimatedDigit key={index} digit={digit} />
      ))}
    </span>
  );
};
