export default function CardRow({ title, count }) {
  return (
    <div className="flex justify-between">
      <h3 className="text-medium">{title}</h3>
      <h3 className="text-medium">{count}</h3>
    </div>
  );
}
