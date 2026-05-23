export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Contact us</h1>
      <p className="mt-4 text-zinc-600">
        Questions about your order or payment? Reach us at:
      </p>
      <ul className="mt-6 space-y-2 text-zinc-800">
        <li>
          <strong>Email:</strong> support@agtraders.example
        </li>
        <li>
          <strong>Phone:</strong> 0300-0000000
        </li>
        <li>
          <strong>Hours:</strong> Mon–Sat, 10am–6pm PKT
        </li>
      </ul>
    </div>
  );
}
