export default function Footer() {
  return (
    <footer
      className="wireframe-border-t mt-auto w-full"
      style={{ backgroundColor: "#f0ede8" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-grid-margin py-unit-lg w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-unit-md">
          <span
            className="text-headline-md font-bold tracking-tighter"
            style={{ color: "#1c1c19", fontFamily: "Geist, sans-serif" }}
          >
            AASHRAYA
          </span>
          <span className="text-label-mono" style={{ color: "#726D68" }}>
            © 2024 AASHRAYA IMPACT HUB. ALL RIGHTS RESERVED.
          </span>
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-unit-md justify-start md:justify-end items-center">
          {[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Impact Report", href: "#" },
            { label: "Contact", href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-label-mono underline transition-colors"
              style={{ color: "#726D68" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ab3600")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#726D68")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
