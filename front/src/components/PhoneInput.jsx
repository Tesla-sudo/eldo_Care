export default function PhoneInput({ value, onChange }) {
  return (
    <input
      type="tel"
      placeholder="+2547XXXXXXXX"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border rounded-lg text-lg"
    />
  );
}
