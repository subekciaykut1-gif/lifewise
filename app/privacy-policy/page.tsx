import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "LifeWise Privacy Policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-6 text-center">
        Privacy Policy
      </h1>
      <p className="font-ui text-sm text-muted text-center mb-12 uppercase tracking-wide">
        Last Updated: March 2026
      </p>

      <div className="prose prose-lg max-w-none font-body text-primary leading-loose prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <p>
          At LifeWise ("we," "us," or "our"), accessible from https://lifewise.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by LifeWise and how we use it.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly to us. For example, we collect information when you subscribe to our newsletter, fill out a form, or communicate with us. The types of information we may collect include your name, email address, and any other information you choose to provide.
        </p>
        <p>
          When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect in various ways, including to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2>Cookies and Web Beacons</h2>
        <p>
          Like any other website, LifeWise uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
        <p>
          For more general information on cookies, please read our <a href="/cookie-policy">Cookie Policy</a>.
        </p>

        <h2>Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a>
        </p>

        <h2>Our Advertising Partners</h2>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
        </p>
        <ul>
          <li>Google: <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></li>
        </ul>

        <h2>Third Party Privacy Policies</h2>
        <p>
          LifeWise's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>

        <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <p>
          Under the CCPA, among other rights, California consumers have the right to:
        </p>
        <ul>
          <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
          <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
          <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
        </ul>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
        </p>

        <h2>GDPR Data Protection Rights</h2>
        <p>
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
        </p>
        <ul>
          <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
          <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
          <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>
        <p>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
        </p>

        <h2>Children's Information</h2>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          LifeWise does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our Privacy Policy, please do not hesitate to contact us at <a href="mailto:hello@lifewise.com">hello@lifewise.com</a>.
        </p>
      </div>
    </div>
  );
}
