"use client";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { MdSms } from "react-icons/md";

const ShareButtons = ({ url }) => {
  const shareOnSocial = (platform) => {
    const encodedUrl = encodeURIComponent(url);
    const message = encodeURIComponent("Check this out!");
    
    const platforms = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${message}`,
      whatsapp: `https://api.whatsapp.com/send?text=${message}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${message}`,
      email: `mailto:?body=${message}%20${encodedUrl}&subject=Shared%20Content`,
      sms: `sms:?body=${message}%20${encodedUrl}`,
      messenger: `fb-messenger://share/?link=${encodedUrl}`,
    };

    if (platforms[platform]) {
      window.open(platforms[platform], "_blank");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 py-2 justify-start">
      {/* Facebook */}
      <button
        onClick={() => shareOnSocial("facebook")}
        className="p-2 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={16} />
      </button>

      {/* Twitter/X */}
      <button
        onClick={() => shareOnSocial("twitter")}
        className="p-2 rounded-full bg-black hover:bg-gray-800 text-white"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={16} />
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => shareOnSocial("whatsapp")}
        className="p-2 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={16} />
      </button>

      {/* Instagram */}
      <button
        onClick={() => shareOnSocial("instagram")}
        className="p-2 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90 text-white"
        aria-label="Share on Instagram"
      >
        <FaInstagram size={16} />
      </button>

      {/* SMS */}
      <button
        onClick={() => shareOnSocial("sms")}
        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        aria-label="Share via SMS"
      >
        <MdSms size={16} />
      </button>

      {/* Messenger */}
      <button
        onClick={() => shareOnSocial("messenger")}
        className="p-2 rounded-full bg-[#006AFF] hover:bg-[#0058CC] text-white"
        aria-label="Share via Messenger"
      >
        <RiMessengerLine size={16} />
      </button>

      {/* Email */}
      <button
        onClick={() => shareOnSocial("email")}
        className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white"
        aria-label="Share via Email"
      >
        <FaEnvelope size={16} />
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
        aria-label="Copy link"
      >
        <FaLink size={16} />
      </button>
    </div>
  );
};

export default ShareButtons;