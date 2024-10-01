const AppFooter = () => {
  return (
    <footer className="py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8 text-sm max-md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="mb-4 text-lg font-bold text-blue-300">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-blue-300">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Help
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Advertise
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Developers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-blue-300">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Copyright Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition duration-300 hover:text-blue-300"
                >
                  Site map
                </a>
              </li>
            </ul>
          </div>
          <div>
            <img
              width={120}
              src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
              alt="Certification Logo"
              className="mb-4 rounded-lg shadow-lg"
            />
            <p className="mb-4 text-xs">
              Copyright © {new Date().getFullYear()} FKoi Shop
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>Designed with ❤️ by FKoi Shop</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
