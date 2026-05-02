import Link from "next/link";

type SearchParams = Promise<{ error?: string }>;

export default async function NewsletterUnsubscribedPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;

  const isError = Boolean(error);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {isError ? "Something went wrong" : "You’re unsubscribed"}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {isError ? (
            <>
              We couldn’t complete unsubscribe (
              {error === "invalid"
                ? "invalid or expired link"
                : error === "missing"
                  ? "missing link"
                  : "please try again"}
              ). You can contact the site owner if this persists.
            </>
          ) : (
            <>
              You won’t receive new article notifications anymore. You can
              subscribe again anytime from the site header.
            </>
          )}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
