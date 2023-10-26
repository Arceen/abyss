interface ColorProps {
  alpha?: number;
  minVal: number;
  maxVal: number;
}
export const getRandomColor = ({
  alpha = 1.0,
  minVal = 0,
  maxVal = 256,
}: ColorProps) => {
  if (maxVal < minVal) {
    return "rgba(255,255, 255, 1)";
  }
  const RED = minVal + Math.floor(Math.random() * (maxVal - minVal));
  const GREEN = minVal + Math.floor(Math.random() * (maxVal - minVal));
  const BLUE = minVal + Math.floor(Math.random() * (maxVal - minVal));
  return `rgba(${RED}, ${GREEN}, ${BLUE}, ${alpha})`;
};
