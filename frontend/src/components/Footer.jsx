import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="border-t flex flex-row justify-around py-2 px-3 gap-4 text-sm">
      <div className="footer-links flex flex-col gap-0.5">
        <span className="">
          <Link to="/privacy-policy">Privacy Policy</Link>
        </span>
        <span className="">
          <Link to="/terms-of-service">Terms of Service</Link>
        </span>
        <span className="">
          <Link to="/contact">Contact Us</Link>
        </span>
      </div>
      <div className="social-media flex flex-col gap-0.5">
        <a
          className=""
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          className=""
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          className=""
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} E-Commerce. 
        <br />
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
