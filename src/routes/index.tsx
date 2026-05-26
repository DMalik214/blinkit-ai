import { createFileRoute } from "@tanstack/react-router";
import { BlinkitApp } from "@/components/blinkit/BlinkitApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blinkit AI — Quick commerce, reimagined" },
      {
        name: "description",
        content:
          "Blinkit reimagined with Generative AI. Ask Blinkit, Fridge Scan, and Smart Week — 10 minute delivery.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <BlinkitApp />;
}
