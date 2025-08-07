import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'Shipping & Returns | Jacket Sunscreen' }];
};

export default function ShippingReturns() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping & Returns</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Header */}
          <div className="text-center border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">SHIPPING AND RETURNS</h2>
            <h3 className="text-xl font-medium text-gray-700">Shipping Policy</h3>
          </div>

          {/* Shipping Policy */}
          <section>
            <p className="text-gray-600 leading-relaxed mb-6">
              We ship all JACKET products discretely as to protect your privacy and keep your products private. All orders are shipped via Registered Mail unless indicated otherwise during the checkout process. The price is a flat rate of $6.95 for orders under $100. Orders that exceed $100 USD are eligible for Free USPS Shipping and delivery takes between 15-21 days.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We guarantee shipment to you. If you do not receive your order within the stipulated time, we will resend your package via Express Mail Service. Though the site indicated UPS as the main carrier, Balshi reserves the right to select FedEx, DHL or other carriers from time to time.
            </p>
          </section>

          {/* Returns and Exchanges */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns and Exchanges</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Returns and exchanges can be made up to 60 days after initial purchase. If you wish to return or exchange an item purchased through JacketSunscreen.com, please package the product to be returned with a copy of the original invoice and mail to the address below:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Return Address:</h3>
              <div className="text-gray-700">
                <p className="font-medium">Balshi Skincare</p>
                <p>4665 W. Atlantic Ave</p>
                <p>Suite A</p>
                <p>Delray Beach, FL 33445</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              For your protection and to ensure prompt delivery, we recommend that you send your return via an insured method, which can be tracked in the case of loss (i.e. UPS or insured Parcel Post). We&rsquo;re sorry, return shipping fees are non-refundable. In the event of damaged items, please contact us immediately for assistance. Additional information can be found in the Damaged Items section.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Your return request will be processed promptly. Returns are processed within 3-5 business days of receipt. An email will be sent to confirm the receipt and processing of your return request. Please note: Only products purchased on JACKET may be returned for refund or exchange. If you have questions about returns, please contact us by phone at{' '}
              <a href="tel:561.272.6000" className="text-blue-600 hover:underline">(561) 272-6000</a> or via email at{' '}
              <a href="mailto:info@jacketsunscreen.com" className="text-blue-600 hover:underline">info@jacketsunscreen.com</a>
            </p>
          </section>

          {/* Damaged Items */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Damaged Items</h2>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              When your order arrives, please inspect the carton for any damage that may have occurred during shipment. It is normal for the shipping carton to show some wear; however, if damage occurred to the item(s) in your shipment, please contact us immediately at{' '}
              <a href="tel:561.272.6000" className="text-blue-600 hover:underline">(561) 272-6000</a>.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Please provide the order number, along with your email address and phone number for fastest service. To assure prompt resolution, please retain the shipping box, packing materials, and the damaged items for inspection by the carrier.
            </p>
          </section>

          {/* Product Sale Policies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Sale Policies</h2>
            
            <p className="text-gray-600 leading-relaxed">
              From time to time, JACKET products are subject to drastic price changes as part of special promotions or sales. Some of these sales will be available only in the Balshi Dermatology Center in Delray Beach, FL, and some of these specials will be available online. These specials and sales are subject to occur at any time and without any notice to the public. Once a special promotion or sale is active, any and all product sales occurring at a time prior to the promotion date are NOT subject to the special promotion or sale price.
            </p>
          </section>

          {/* Satisfaction Guaranteed */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Satisfaction Guaranteed</h2>
            
            <p className="text-gray-600 leading-relaxed">
              If for any reason you are not completely satisfied with your JACKET online purchase, simply return the unused portion within 60 days of initial purchase, and we will be happy to remit your account for the full amount of the purchase.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">For any questions about shipping, returns, or exchanges, please contact us:</p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-900">📧 <a href="mailto:info@jacketsunscreen.com" className="text-blue-600 hover:underline">info@jacketsunscreen.com</a></p>
              <p className="text-gray-900">📞 <a href="tel:561.272.6000" className="text-blue-600 hover:underline">(561) 272-6000</a></p>
              <p className="text-gray-900">📬 4665 W Atlantic Ave, Suite A, Delray Beach, FL 33445</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 