export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          Last updated: June 2026
        </p>
      </div>

      <div className="space-y-10 text-base leading-relaxed text-gray-600 dark:text-gray-400">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Overview
          </h2>
          <p className="mt-3">
            Climate Hub is a personal, non-commercial project. It is a read-only
            data exploration platform. No accounts exist. No personal data is
            collected, stored, or processed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            No account required
          </h2>
          <p className="mt-3">
            Climate Hub requires no registration, login, or account of any kind.
            All content on this platform is freely accessible without providing
            any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            No personal data collected
          </h2>
          <p className="mt-3">
            Climate Hub does not collect, store, or process any personal data.
            This includes names, email addresses, IP addresses, device
            identifiers, and any other information that could identify an
            individual.
          </p>
          <p className="mt-3">
            No forms exist on this platform. No data is submitted by users and
            no data is retained server-side beyond what is necessary to serve
            each HTTP request.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            No advertising or tracking
          </h2>
          <p className="mt-3">
            Climate Hub does not use advertising networks, marketing trackers,
            or third-party analytics platforms. There are no pixels, beacons, or
            fingerprinting scripts of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cookies
          </h2>
          <p className="mt-3">
            Climate Hub does not set cookies for profiling, tracking, or
            advertising purposes. If the browser sets any technical cookies
            (for example, related to session handling or preferences), these are
            not used to identify users or build profiles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            External links
          </h2>
          <p className="mt-3">
            This platform contains links to external websites, including data
            sources such as the World Bank, Our World in Data, and the European
            Environment Agency. Climate Hub has no control over and accepts no
            responsibility for the privacy practices of those external sites.
            Users are encouraged to review the privacy policies of any
            third-party sites they visit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Analytics
          </h2>
          <p className="mt-3">
            At the time of this writing, Climate Hub does not use any analytics
            service. If analytics are introduced in the future, this policy will
            be updated to reflect the nature and scope of data collected, and
            users will be informed before any tracking begins.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contact
          </h2>
          <p className="mt-3">
            Questions about this policy can be directed to the project
            maintainer via the{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
            >
              GitHub repository
            </a>
            .
          </p>
        </section>

      </div>
    </div>
  )
}
