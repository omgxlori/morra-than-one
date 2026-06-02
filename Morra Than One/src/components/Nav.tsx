type NavProps = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

function Nav({ currentPage, setCurrentPage }: NavProps) {
  const navItems = ["Home", "Baby Registry", "Baby Shower Info"];

  return (
  <nav className="nav-container">
    {navItems.map((item) => (
      <button
        key={item}
        onClick={() => setCurrentPage(item)}
        className={`nav-button ${
          currentPage === item ? "nav-button-active" : ""
        }`}
      >
        {item}
      </button>
    ))}
  </nav>
);
}

export default Nav;