const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="h-16 flex items-center justify-center text-gray-500 text-sm">
      © {year} Admin Dashboard. All rights reserved.
    </footer>
  );
};

export default Footer;
