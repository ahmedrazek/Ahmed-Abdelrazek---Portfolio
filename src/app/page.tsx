import path from "node:path";
import { site } from "@/content/site";
import { resolveCvHref, resolveProjectMedia } from "@/content/media";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { SkillsTicker } from "@/components/sections/skills-ticker";
import { Work } from "@/components/sections/work";
import { Capabilities } from "@/components/sections/capabilities";
import { Experience } from "@/components/sections/experience";
import { WorkWithMe } from "@/components/sections/work-with-me";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  const publicDir = path.join(process.cwd(), "public");
  const cvHref = resolveCvHref(site.contact, publicDir);
  const work = site.projects.map((project) => ({
    project,
    media: resolveProjectMedia(project, publicDir),
  }));

  return (
    <main className="relative">
      <Nav cvHref={cvHref} />
      <Hero profile={site.profile} />
      <ProofStrip stats={site.stats} />
      <SkillsTicker skills={site.skills} />
      <Work items={work} />
      <Capabilities items={site.capabilities} />
      <Experience roles={site.experience} />
      <WorkWithMe offers={site.offers} />
      <About profile={site.profile} />
      <Contact contact={site.contact} cvHref={cvHref} />
    </main>
  );
}
