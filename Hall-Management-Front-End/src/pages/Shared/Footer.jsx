

const Footer = () => {
    return (
      <div className="bg-base-200">

<footer className="max-w-7xl mx-auto footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>

    <img       width="100"
      height="100"
       src="../../../public/MBSTU_Logo.png" alt="" />
    <p>
    Sheikh Russel Hall
      <br />
      Mawlana Bhashani
      Science and Technology University (MBSTU)
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Usefull   Links</h6>
    <a className="link link-hover">Home</a>
    <a className="link link-hover">About Us</a>
    <a className="link link-hover">Contact Us</a>
    <a className="link link-hover">Terms & Conditions</a>
  </nav>
  <nav>
    <h6 className="footer-title">Contact US</h6>
     <p>MBSTU <br />Santosh, Tangail <br />Bangladesh</p>
     <br />
    
     <p>Phone: +88017XXXXXX</p>
     <p>Email: russel@gamilcom</p>
  </nav>

</footer>
      </div>
    );
};

export default Footer;