import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const ModalWrapper: React.FC<{
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }> = ({ show, onClose, title, children }) => (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden z-[101]"
          >
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="prose dark:prose-invert prose-sm max-w-none space-y-6">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const EmailLink: React.FC<{ email: string }> = ({ email }) => (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-md transition-colors group"
    >
      <Mail className="w-4 h-4 group-hover:animate-bounce" />
      {email}
    </a>
  );

  const ContactItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
  }> = ({ icon, label, value, href }) => (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
    >
      <div className="mt-1 text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400">
        {icon}
      </div>
      <div>
        <div className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-300">
          {label}
        </div>
        <div className="text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400">
          {value}
        </div>
      </div>
    </a>
  );

  return (
    <>
      <footer className="w-full bg-white dark:bg-black border-t border-gray-200/20 dark:border-gray-800/20 py-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Aadhya. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setShowPrivacyPolicy(true)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setShowTermsOfService(true)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => setShowContact(true)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <ModalWrapper
        show={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        title="Privacy Policy"
      >
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl mb-6">
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            Welcome to Aadhya! Your privacy matters deeply to us. Here's how we handle your information:
          </p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We collect only what's necessary, like your name, email, and any ADHD-related or health details you choose to share. To make Aadhya better, we also gather non-personal data about how you use the app. Rest assured, your data is encrypted, securely stored, and never sold. We'll only share it if the law requires us to.
        </p>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          You're in control of your data. You can access, update, or delete it anytime. Just reach out to us at <EmailLink email="support@aadhya.ai.com" />. We'll only keep your information as long as we need it to provide our services or meet legal requirements, after which it's safely deleted. If we integrate with other services, their privacy policies apply, so we encourage you to review them. Updates to this policy will be shared in the app and take effect immediately.
        </p>
      </ModalWrapper>

      {/* Terms of Service Modal */}
      <ModalWrapper
        show={showTermsOfService}
        onClose={() => setShowTermsOfService(false)}
        title="Terms of Service"
      >
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl mb-6">
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            Welcome to Aadhya! By using our app, you agree to these terms. We follow the laws of the United Kingdom, including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, to ensure your rights and data are respected.
          </p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          To use Aadhya, you must be at least 13 years old or have parental consent if you are under 18. You are responsible for safeguarding your account details. Misusing the app—including unauthorized access, hacking, or any other harmful activities—is prohibited and may result in the suspension or termination of your account.
        </p>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We strive to provide accurate and reliable services, but Aadhya is offered "as is." While we aim to support your journey, we cannot guarantee that the app will be free from errors or interruptions. We are not liable for any damages arising from your use of the app unless required by law.
        </p>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Your data is handled in compliance with UK data protection laws. You have the right to access, correct, or delete your data, and we ensure that your personal information is stored securely and processed responsibly. Any changes to these terms will be communicated in the app, and continued use indicates your acceptance of the updated terms.
        </p>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          For any questions about these terms, please contact us at <EmailLink email="support@aadhya.ai.com" />. Disputes related to these terms will be governed by the laws of England and Wales, and any legal proceedings will take place in courts within this jurisdiction.
        </p>
      </ModalWrapper>

      {/* Contact Modal */}
      <ModalWrapper
        show={showContact}
        onClose={() => setShowContact(false)}
        title="Contact Us"
      >
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl mb-6">
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            If you have questions, concerns, or need assistance, feel free to reach out:
          </p>
        </div>

        <div className="space-y-3">
          <ContactItem
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            value="support@aadhya.ai.com"
            href="mailto:support@aadhya.ai.com"
          />
          
          <ContactItem
            icon={<Phone className="w-5 h-5" />}
            label="Phone"
            value="+44 7890 123456"
            href="tel:+447890123456"
          />
          
          <ContactItem
            icon={<Linkedin className="w-5 h-5" />}
            label="LinkedIn"
            value="Aadhya on LinkedIn"
            href="https://www.linkedin.com/company/aadhya-ai/"
          />
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-6 text-center">
          We're here to help and are excited to have you on board with Aadhya!
        </p>
      </ModalWrapper>
    </>
  );
};

export default Footer;
