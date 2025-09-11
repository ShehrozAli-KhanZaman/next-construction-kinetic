import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Privacy Policy - Real Exchange",
    description: "Privacy Policy for Real Exchange - Your trusted partner in construction and real estate",
}

export default function PrivacyPolicy() {
    return (
        <div className={`${inter.className} min-h-screen bg-gray-50`}>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Privacy Policy for Real Exchange
                    </h1>

                    <div className="mb-6">
                        <p className="text-lg text-gray-700">
                            <strong>Last Updated:</strong> September 11, 2025
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            1. Information We Collect
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We collect information you provide directly to us, such as when you:
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-gray-700">
                            <li>Create an account</li>
                            <li>List or search for properties</li>
                            <li>Contact us for support</li>
                            <li>Subscribe to our premium services</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            2. Types of Information
                        </h2>
                        <ul className="list-disc pl-6 mb-6 text-gray-700">
                            <li><strong>Personal Information:</strong> Name, email, phone number</li>
                            <li><strong>Property Information:</strong> Property details, photos, location</li>
                            <li><strong>Usage Information:</strong> App usage, preferences, search history</li>
                            <li><strong>Device Information:</strong> Device type, operating system, app version</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            3. How We Use Your Information
                        </h2>
                        <ul className="list-disc pl-6 mb-6 text-gray-700">
                            <li>Provide and maintain our services</li>
                            <li>Process transactions and subscriptions</li>
                            <li>Send you notifications and updates</li>
                            <li>Improve our app and services</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            4. Information Sharing
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We do not sell your personal information. We may share information with:
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-gray-700">
                            <li>Service providers who assist us in operating our app</li>
                            <li>Legal authorities when required by law</li>
                            <li>Other users when you choose to share property information</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            5. Data Security
                        </h2>
                        <p className="text-gray-700 mb-6">
                            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            6. Your Rights
                        </h2>
                        <p className="text-gray-700 mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-gray-700">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Delete your account and data</li>
                            <li>Opt out of marketing communications</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            7. Contact Us
                        </h2>
                        <p className="text-gray-700 mb-4">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <p className="text-gray-700 mb-2">
                                <strong>Email:</strong> realexchnge@gmail.com
                            </p>
                            <p className="text-gray-700">
                                <strong>Website:</strong> https://root.real-exchange.com
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                            8. Changes to This Policy
                        </h2>
                        <p className="text-gray-700 mb-6">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center">
                            This Privacy Policy is effective as of September 11, 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
