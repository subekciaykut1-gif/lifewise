import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "LifeWise Cookie Policy. Understand what cookies are and how we use them on our site.",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-6 text-center">
        Cookie Policy
      </h1>
      <p className="font-ui text-sm text-muted text-center mb-12 uppercase tracking-wide">
        Last Updated: March 2026
      </p>

      <div className="prose prose-lg max-w-none font-body text-primary leading-loose prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <p>
          This Cookie Policy explains what cookies are and how we use them. You should read this policy to understand what cookies are, how we use them, the types of cookies we use i.e, the information we collect using cookies and how that information is used and how to control the cookie preferences.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that are used to store small pieces of information. The cookies are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make the website more secure, provide better user experience, and understand how the website performs and to analyze what works and where it needs improvement.
        </p>

        <h2>How Do We Use Cookies?</h2>
        <p>
          As most of the online services, our website uses cookies first-party and third-party cookies for a number of purposes. The first-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.
        </p>
        <p>
          The third-party cookies used on our websites are used mainly for understanding how the website performs, how you interact with our website, keeping our services secure, providing advertisements that are relevant to you, and all in all providing you with a better and improved user experience and help speed up your future interactions with our website.
        </p>

        <h2>Types of Cookies We Use</h2>
        
        <h3>Essential Cookies</h3>
        <p>
          Some cookies are essential for you to be able to experience the full functionality of our site. They allow us to maintain user sessions and prevent any security threats. They do not collect or store any personal information.
        </p>

        <h3>Analytics Cookies</h3>
        <p>
          These cookies store information such as the number of visitors to the website, the number of unique visitors, which pages of the website have been visited, the source of the visit etc. These data help us understand and analyze how well the website performs and where it needs improvement. We use Google Analytics for this purpose.
        </p>

        <h3>Advertising Cookies</h3>
        <p>
          Our website displays advertisements. These cookies are used to personalize the advertisements that we show to you so that they are meaningful to you. These cookies also help us keep track of the efficiency of these ad campaigns.
        </p>
        <p>
          The information stored in these cookies may also be used by the third-party ad providers to show you ads on other websites on the browser as well. We use Google AdSense and other advertising partners.
        </p>

        <h2>How Can I Control the Cookie Preferences?</h2>
        <p>
          Different browsers provide different methods to block and delete cookies used by websites. You can change the settings of your browser to block/delete the cookies. To find out more out more on how to manage and delete cookies, visit <a href="https://www.allaboutcookies.org">allaboutcookies.org</a>.
        </p>
        <p>
          Additionally, you can opt-out of personalized advertising by visiting:
        </p>
        <ul>
          <li>Google Ad Settings: <a href="https://adssettings.google.com">https://adssettings.google.com</a></li>
          <li>Network Advertising Initiative: <a href="http://optout.networkadvertising.org">http://optout.networkadvertising.org</a></li>
        </ul>
      </div>
    </div>
  );
}
