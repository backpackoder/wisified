import { useSearchParams } from "next/navigation";

export function AuthorNotFound() {
  const queryParams = useSearchParams().get("author");

  return queryParams !== null && queryParams !== "" ? (
    <p className="bg-red-500 text-white text-center font-semibold p-2 rounded-lg">
      No author found with the name of {`"${queryParams}"`}
    </p>
  ) : null;
}
