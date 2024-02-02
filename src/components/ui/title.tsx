export default function Title({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <h2 className={`${className} font-bold`}>{text}</h2>;
}
