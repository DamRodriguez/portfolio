import styles from "@/components/spinner/Spinner.module.css";

type SpinnerProps = {
  size?: string | number;
  color?: string;
};

const Spinner = ({ size = 20, color = "var(--color-soft-gray)" }: SpinnerProps) => {
  return (
    <svg className={styles.spinner} viewBox="25 25 50 50" width={size} stroke={color}>
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  );
};

export default Spinner;
