import { type MetaFunction } from 'react-router';
import { useCookieConsent } from '~/hooks/useCookieConsent';
import { CookiePreferencesModal } from '~/components/homepage/CookiePreferencesModal';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'Privacy Policy | Jacket Sunscreen' }];
};

export default function PrivacyPolicy() {
  const { preferences, updateConsent, resetConsent } = useCookieConsent();
  const [showCookieModal, setShowCookieModal] = useState(false);

  const handleSavePreferences = (newPreferences: any) => {
    updateConsent(newPreferences);
    setShowCookieModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Header */}
          <div className="text-center border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">PRIVACY POLICY</h2>
            <p className="text-gray-600">Effective Date: 06/15/2025</p>
          </div>

          {/* Introduction */}
          <section>
            <p className="text-gray-600 leading-relaxed mb-4">
              Jacket Sunscreen (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting it through this Privacy Policy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This Privacy Policy explains how we collect, use, share, and protect personal information when you use our website https://jacketsunscreen.com, engage with us on social media, or interact with our advertising and analytics tools (such as the Meta Pixel).
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">A. Personal Information You Provide</h3>
                <p className="text-gray-600 mb-3">We may collect the following:</p>
                <ul className="text-gray-600 space-y-1 list-disc list-inside ml-4">
                  <li>Name, email address, phone number</li>
                  <li>Billing and shipping address</li>
                  <li>Order history and preferences</li>
                  <li>Messages, reviews, or feedback</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">B. Information Collected Automatically</h3>
                <p className="text-gray-600 mb-3">
                  When you use our site, we collect data using cookies, pixels, and similar technologies:
                </p>
                <ul className="text-gray-600 space-y-1 list-disc list-inside ml-4 mb-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring URL</li>
                  <li>Interactions with ads or emails</li>
                </ul>
                <p className="text-gray-600 mb-3">This includes data from tools like:</p>
                <ul className="text-gray-600 space-y-1 list-disc list-inside ml-4">
                  <li>Meta Pixel</li>
                  <li>Google Analytics</li>
                  <li>Shopify/WooCommerce</li>
                  <li>Email marketing platforms</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-3">We use your information to:</p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside ml-4">
              <li>Process and fulfill orders</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Understand how our site is used and improve our services</li>
              <li>Measure and improve our advertising performance</li>
              <li>Create custom audiences for online ads (e.g., on Meta platforms)</li>
            </ul>
          </section>

          {/* 3. Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies for site functionality, analytics, and advertising.
            </p>
            <p className="text-gray-600 mb-4">
              Third parties, including Meta and Google, may use cookies, web beacons, and other storage technologies to collect or receive information from our website and elsewhere on the internet, and use that information to provide measurement services and targeted ads.
            </p>
            <p className="text-gray-600 mb-3">You can learn more and opt out by visiting:</p>
            <ul className="text-gray-600 space-y-1 list-disc list-inside ml-4 mb-4">
              <li><a href="http://www.aboutads.info/choices" className="text-blue-600 hover:underline">http://www.aboutads.info/choices</a></li>
              <li><a href="http://www.youronlinechoices.eu" className="text-blue-600 hover:underline">http://www.youronlinechoices.eu</a></li>
            </ul>
            <p className="text-gray-600">
              If you are in the EU/UK, you will be presented with a cookie consent banner upon first visit to manage your preferences.
            </p>
          </section>

          {/* 4. Sharing Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sharing Your Information</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We only share data with trusted third parties for legitimate business purposes, such as:
            </p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside ml-4 mb-4">
              <li>Payment processors</li>
              <li>Shipping carriers</li>
              <li>Advertising partners (e.g., Meta, Google)</li>
              <li>Analytics services</li>
              <li>Email marketing providers</li>
            </ul>
            <p className="text-gray-600">
              All third parties are contractually obligated to keep your data secure and confidential.
            </p>
          </section>

          {/* 5. Meta Business Tools Compliance */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Meta Business Tools Compliance</h2>
            <p className="text-gray-600 mb-4">
              We use Meta Business Tools (including the Meta Pixel and Conversions API). These tools may collect information (Event Data) such as:
            </p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside ml-4 mb-4">
              <li>Visits to our website</li>
              <li>Purchases and checkout behavior</li>
              <li>Interactions with our ads</li>
            </ul>
            <p className="text-gray-600 mb-4">
              We ensure all contact information is hashed before transmission where applicable. Users can opt out via <a href="https://www.facebook.com/settings/?tab=ads" className="text-blue-600 hover:underline">https://www.facebook.com/settings/?tab=ads</a>.
            </p>
          </section>

          {/* 6. Your Rights and Choices */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-600 mb-4">Depending on your location, you may have the following rights:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">California (CCPA/CPRA):</h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside ml-4 mb-4">
                  <li>Right to know what we collect</li>
                  <li>Right to request deletion</li>
                  <li>Right to opt out of &ldquo;sharing&rdquo; for advertising purposes</li>
                  <li>Right to non-discrimination</li>
                </ul>
                <p className="text-gray-600">
                  To exercise these rights, email us at: <a href="mailto:info@jacketsunscreen.com" className="text-blue-600 hover:underline">info@jacketsunscreen.com</a> or click the &ldquo;Do Not Sell or Share My Personal Information&rdquo; link in the footer.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">European Union / UK (GDPR):</h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside ml-4 mb-4">
                  <li>Right to access or correct your data</li>
                  <li>Right to request erasure</li>
                  <li>Right to restrict or object to processing</li>
                  <li>Right to data portability</li>
                  <li>Right to lodge a complaint with a data protection authority</li>
                </ul>
                <p className="text-gray-600">
                  You can exercise your rights by contacting us at <a href="mailto:info@jacketsunscreen.com" className="text-blue-600 hover:underline">info@jacketsunscreen.com</a>.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational safeguards to protect your data. However, no method of transmission or storage is completely secure. Please use caution when sharing personal information online.
            </p>
          </section>

          {/* 8. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children&rsquo;s Privacy</h2>
            <p className="text-gray-600">
              We do not knowingly collect or process information from individuals under the age of 13. If you believe we have collected such data, contact us at <a href="mailto:info@jacketsunscreen.com" className="text-blue-600 hover:underline">info@jacketsunscreen.com</a> and we will delete it promptly.
            </p>
          </section>

          {/* 9. International Data Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-600">
              If you are accessing our site from outside the United States, your information may be transferred to and processed in the U.S. where data protection laws may differ from those in your jurisdiction.
            </p>
          </section>

          {/* 10. Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy occasionally to reflect changes in our practices. The &ldquo;Effective Date&rdquo; at the top of this page indicates when this policy was last revised.
            </p>
          </section>

          {/* 11. Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 mb-4">If you have any questions or concerns, please contact us at:</p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-900">📧 <a href="mailto:info@jacketsunscreen.com" className="text-blue-600 hover:underline">info@jacketsunscreen.com</a></p>
              <p className="text-gray-900">📬 4665 W Atlantic Ave B, Delray Beach, FL 33445</p>
            </div>
          </section>

          {/* Cookie Management Section */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Management</h2>
            <p className="text-gray-600 mb-6">
              We use cookie consent management to ensure compliance with GDPR/CPRA. You may update your preferences anytime via the &ldquo;Cookie Settings&rdquo; link in our footer.
            </p>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Your Cookie Preferences</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowCookieModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Update Cookie Preferences
                </button>
                <button
                  onClick={resetConsent}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors ml-3"
                >
                  Reset All Preferences
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        isVisible={showCookieModal}
        onClose={() => setShowCookieModal(false)}
        onSave={handleSavePreferences}
        currentPreferences={preferences}
      />
    </div>
  );
} 