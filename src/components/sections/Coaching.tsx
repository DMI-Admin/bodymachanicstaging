import { site } from "@/lib/site";

export default function Coaching() {
  return (
    <section id="coaching" className="py-20 sm:py-28">
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>
            Our coaching programme
          </p>
          <h2 className="display h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            More than a plan.
            <br />
            <span className="shine-text">It&rsquo;s a system.</span>
          </h2>
          <p className="copy mt-6" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            We don&rsquo;t believe in random workouts, crash diets or one-size-fits-all plans. Your coaching is built
            around your body, your schedule, your training ability and the result you want to achieve.
          </p>

          <div className="mt-8 flex flex-wrap gap-4" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
            <a className="btn" href="#apply">
              Start Your Application
            </a>
            <a className="btn btn-outline" href="#included">
              See What&rsquo;s Included
            </a>
          </div>
        </div>

        <div
          className="card p-7 sm:p-10 lg:p-12"
          data-reveal="right"
          data-accent="true"
          style={{ "--d": "150ms" } as React.CSSProperties}
        >
          <p className="eyebrow">Every client gets</p>
          <ul className="grid list-none gap-3.5 p-0">
            {site.coaching.map((item, i) => (
              <li
                key={item}
                className="check-item text-[15px] text-[#e6e0d2]"
                data-reveal
                style={{ "--d": `${220 + i * 70}ms` } as React.CSSProperties}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
