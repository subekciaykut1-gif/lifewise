import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "LifeWise Terms of Use. Read our terms and conditions for using our website.",
  alternates: { canonical: `${SITE_URL}/terms-of-use` },
  openGraph: {
    url: `${SITE_URL}/terms-of-use`,
    title: "Terms of Use | LifeWise",
    description: "LifeWise Terms of Use. Read our terms and conditions for using our website.",
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold text-primary mb-6 text-center">
        Terms of Use
      </h1>
      <p className="font-ui text-sm text-muted text-center mb-12 uppercase tracking-wide">
        Last Updated: March 2026
      </p>

      <div className="prose prose-slate lg:prose-lg max-w-3xl mx-auto dark:prose-invert font-body text-primary leading-loose prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <p>
          Welcome to LifeWise! These terms and conditions outline the rules and regulations for the use of our Website, located at <a href="https://wisetips.co">https://wisetips.co</a>.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use LifeWise if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2>2. Intellectual Property Rights</h2>
        <p>
          Other than the content you own, under these Terms, LifeWise and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
        </p>
        <p>
          You are specifically restricted from all of the following:
        </p>
        <ul>
          <li>Publishing any Website material in any other media;</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>Publicly performing and/or showing any Website material;</li>
          <li>Using this Website in any way that is or may be damaging to this Website;</li>
          <li>Using this Website in any way that impacts user access to this Website;</li>
          <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
          <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
          <li>Using this Website to engage in any advertising or marketing.</li>
        </ul>

        <h2>3. Your Content</h2>
        <p>
          In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant LifeWise a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
        </p>
        <p>
          Your Content must be your own and must not be invading any third-party's rights. LifeWise reserves the right to remove any of Your Content from this Website at any time without notice.
        </p>

        <h2>4. No Warranties</h2>
        <p>
          This Website is provided "as is," with all faults, and LifeWise express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall LifeWise, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  LifeWise, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
        </p>

        <h2>6. Indemnification</h2>
        <p>
          You hereby indemnify to the fullest extent LifeWise from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.
        </p>

        <h2>7. Severability</h2>
        <p>
          If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
        </p>

        <h2>8. Variation of Terms</h2>
        <p>
          LifeWise is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
        </p>

        <h2>9. Assignment</h2>
        <p>
          The LifeWise is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
        </p>

        <h2>10. Entire Agreement</h2>
        <p>
          These Terms constitute the entire agreement between LifeWise and you in relation to your use of this Website, and supersede all prior agreements and understandings.
        </p>

        <h2>11. Governing Law & Jurisdiction</h2>
        <p>
          These Terms will be governed by and interpreted in accordance with applicable international laws. Any disputes will be resolved through good-faith negotiation or, if necessary, binding arbitration.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us at <a href="mailto:hello@wisetips.co">hello@wisetips.co</a>.
        </p>
      </div>
    </div>
  );
}
