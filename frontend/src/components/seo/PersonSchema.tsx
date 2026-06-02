import config from "@/config/config";
import { siteConfig } from "@/config/site";

export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.creator.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/profile.jpg`,
    jobTitle: "Frontend Developer",
    description:
      "Frontend Developer especializado en React, Next.js, TypeScript y Tailwind CSS.",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Frontend Development",
      "Responsive Design",
      "Web Performance",
      "SEO",
      "Accessibility",
    ],
    sameAs: [config.urls.github, config.urls.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
