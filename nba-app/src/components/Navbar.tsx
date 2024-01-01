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
            <Link href="/teams" className="link">
              Teams
            </Link>
          </li>
          <li>
            <Link href="/players" className="link">
              Search for Player
            </Link>
          </li>
        </ul>
        <div className="signin">
          <button onClick={""} style={{backgroundColor:"rgba(17, 0, 35, 0.912)"}}>
            <img src="/signin.png" alt="signout" />
            </button>
          <div className="message">Sign out</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
