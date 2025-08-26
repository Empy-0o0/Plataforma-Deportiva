import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="container">
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
