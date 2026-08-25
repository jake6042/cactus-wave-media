import { permanentRedirect } from "next/navigation";

/** Brand kit is internal — not a public marketing URL. */
export default function BrandPage() {
  permanentRedirect("/");
}
