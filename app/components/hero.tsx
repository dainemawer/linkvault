"use server";

export default async function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="py-4 px-0 sm:py-0 min-h-36">
      {title && <h1 className="font-bold text-6xl mt-4">{title}</h1>}

      {description && (
        <p className="mb-8 mt-3 text-2xl text-neutral-500">{description}</p>
      )}
    </div>
  );
}
