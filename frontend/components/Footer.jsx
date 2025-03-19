const Footer = () => {
    return (
      <footer className="bg-[#27272A] font-montserrat text-white py-6 px-6 md:px-60">
        <div className=" text-lg font-semibold border-b offset-1 mb-4">NextGenDevices</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start text-sm">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
        </div>
        <div className="text-start text-xs mt-4">&copy; {new Date().getFullYear()} NextGenDevices. All rights reserved.</div>
      </footer>
    );
  };
  
  export default Footer;
  