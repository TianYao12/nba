import Link from "next/link";
function Navbar() {
  return (
    <div className="outside">
      <div className="header">
        <Link href="/" className="link">
          <img src="/nbalogo.png"></img>
        </Link>
        <ul className="main-nav">
          <li>
            <Link href="/" className="link">
              News
            </Link>
          </li>
          <li>
            <Link href="/game3" className="link">
              Games
            </Link>
          </li>
          <li>
            <Link href="/teams" className="link">
              Teams
            </Link>
          </li>
          <li>
            <a href="/compare" className="link">
              Compare
            </a>
          </li>
        </ul>
        <div className="signin">
          <a href="/players">
            <img src="/signin.png" alt="Search player" />
          </a>
          <div className="message">Search for player</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
