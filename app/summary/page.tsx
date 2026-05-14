import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import "../globals.css";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <header className="mb-16 flex items-center justify-between gap-8">
          <div>
            <h1 className="mb-1 text-xl font-normal">anthony buncio</h1>
            <p className="mb-1 text-sm text-neutral-400">software engineer</p>
            <a
              href="https://github.com/anthonybuncio"
              className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white hover:underline underline-offset-4 transition-all"
            >
              github.com/anthonybuncio
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <Image
            src="/me.png"
            alt="anthony buncio"
            width={100}
            height={100}
            className="rounded-full object-cover shrink-0"
          />
        </header>

        {/* About Section */}
        <section className="mb-16">
          <h2 className="mb-4 text-sm font-normal">About</h2>
          <p className="text-sm">
            I'm a full-stack engineer with 9+ years of experience across the
            entire software development lifecycle — from concept and
            architecture through delivery and long-term maintenance. I
            specialize in JavaScript and TypeScript, with a strong foundation in
            both front-end and back-end development, and a track record of
            building systems that hold up under real-world conditions.
            <br />
            <br />
            My work sits at the intersection of data engineering and product. In
            my current role, I architect and own a multi-source operational
            intelligence platform: real-time data pipelines, cross-system
            normalization layers, financial reconciliation engines, and
            compliance-aware reporting. The work demands systems thinking,
            precision, and the ability to analyze complex problems and engineer
            well-reasoned solutions — not just quick fixes.
            <br />
            <br />
            Beyond the technical, I'm a detail-oriented engineer and
            collaborator. I've worked across engineering and business
            stakeholders, contributed to a positive team culture, and taken
            ownership of both the code and the outcomes it drives. That
            ownership mentality is what I bring to every team I'm part of.
          </p>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-sm font-normal">Experience</h2>
          <div className="grid grid-cols-[140px_1fr] gap-x-8 gap-y-6 mb-6">
            <div className="text-sm text-neutral-400">2023 — Now</div>
            <div>
              <a
                href="https://v0.link/fm"
                className="mb-2 inline-flex items-center gap-1 text-sm font-normal hover:underline underline-offset-4 transition-all"
              >
                IDAD Inc.
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Exemplified a strong commitment to organizational excellence by
                consistently meeting deadlines, developing personal growth
                goals, and executing company programs with unwavering
                dedication.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Implemented successful advertising and promotional campaigns,
                giving rise to a 15% increase in store traffic and a 20% boost
                in revenue, effectively driving business growth.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Optimized labor costs through efficient scheduling, aligning
                staffing levels with peak hours while accommodating employee
                preferences, resulting in improved employee morale and cost
                savings.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Maintained a clean and organized store, exceeding brand and
                company standards, which contributed to a 25% increase in
                positive guest reviews and loyalty, ultimately enhancing guest
                satisfaction and repeat business.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-x-8 gap-y-6 mb-6">
            <div className="text-sm text-neutral-400">2022 — 2023</div>
            <div>
              <a
                href="https://lottery.com/"
                className="mb-2 inline-flex items-center gap-1 text-sm font-normal hover:underline underline-offset-4 transition-all"
              >
                Lottery.com
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Collaborated with the VP of Data & Insights to design and
                execute tracking and reporting strategies across all products.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Led integration and implementation efforts, providing expert
                guidance on cross-platform metrics, reporting, and logging
                systems’ architecture.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Orchestrated data integrations and ETL pipelines into multiple
                BI tools, including Google Analytics, BigQuery, and Mixpanel.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Worked with the product team to establish appropriate metrics
                and tracking plans, documenting all work and drafting
                comprehensive technical specifications.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-x-8 gap-y-6 mb-6">
            <div className="text-sm text-neutral-400">2019 — Now</div>
            <div>
              <a
                href="https://v0.link/fm"
                className="mb-2 inline-flex items-center gap-1 text-sm font-normal hover:underline underline-offset-4 transition-all"
              >
                Eybl Digital - Creative Agency
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Developed and maintained full-stack web applications for
                clients using Node.js, TypeScript, React and other relevant
                technologies.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Collaborated with clients to gather requirements and create
                technical specifications for web projects, ensuring a thorough
                understanding of their needs and goals.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Designed and implemented complex APIs and web services,
                including integrations with third-party services and databases.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Maintained and updated existing web applications, implementing
                new features and improvements to meet evolving business needs.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-x-8 gap-y-6 mb-6">
            <div className="text-sm text-neutral-400">2019 — 2022</div>
            <div>
              <a
                href="https://instagram.com/simplyhempwellness/"
                className="mb-2 inline-flex items-center gap-1 text-sm font-normal hover:underline underline-offset-4 transition-all"
              >
                Simply Hemp Wellness
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Designed and developed e-commerce website using the latest web
                technologies and frameworks.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Managed and maintained product catalog, ensuring accurate and
                up-to-date product information, pricing, and availability.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Implemented advanced analytics and tracking solutions,
                providing insights into website traffic, user behavior, and
                other key metrics.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Executed digital marketing campaigns, including email
                marketing, search engine optimization, and pay-per- click
                advertising, to drive traffic, generate leads, and increase
                online sales.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Managed and maintained the IT infrastructure, including
                desktops, laptops, servers, and network equipment.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-x-8 gap-y-6 mb-6">
            <div className="text-sm text-neutral-400">2008 — 2018</div>
            <div>
              <a
                href="https://gotofoods.com/"
                className="mb-2 inline-flex items-center gap-1 text-sm font-normal hover:underline underline-offset-4 transition-all"
              >
                GoTo Foods (Previously: Focus Brands)
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Oversaw the day-to-day operations of the customer service team,
                managing and directing all aspects of the customer service
                experience, including POS transactions.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Created and maintained employee schedules, providing optimal
                coverage during peak hours and balancing staff needs with
                business demands.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Analyzed and reported on key POS-related metrics, such as sales
                volume, refunds, and inventory levels, identifying areas for
                improvement.
              </p>
              <p className="text-sm leading-relaxed text-neutral-400">
                -Completed administrative tasks related to customer service and
                POS transactions, such as record-keeping, budgeting, and
                forecasting, ensuring accuracy and timely completion.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="mb-6 text-sm font-normal">Contact</h2>
          <div className="grid grid-cols-[140px_1fr] gap-x-8 gap-y-4">
            <div className="text-sm text-neutral-400">Linkedin</div>
            <a
              href="https://www.linkedin.com/in/anthonybuncio1/"
              className="inline-flex items-center gap-1 text-sm hover:underline underline-offset-4 transition-all"
            >
              anthonybuncio1
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <div className="text-sm text-neutral-400">GitHub</div>
            <a
              href="https://github.com/anthonybuncio"
              className="inline-flex items-center gap-1 text-sm hover:underline underline-offset-4 transition-all"
            >
              anthonybuncio
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
