import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n";

function Navbar() {
  const { t } = useTranslation();
  function handleSignOut() {
    signOut();
  }
  function handleTranslation() {
    i18n.language === "en"
      ? i18n.changeLanguage("zh")
      : i18n.changeLanguage("en");
  }

  return (
    <div className="outside">
      <div className="header">
        <Link href="/" className="link">
          <img src="/nbalogo.png"></img>
        </Link>
        <ul className="main-nav">
          <li>
            <Link href="/" className="link">
              {t("news")}
            </Link>
          </li>
          <li>
            <Link href="/teams" className="link">
              {t("teams")}
            </Link>
          </li>
          <li>
            <Link href="/players" className="link">
              {t("search-for-player")}
            </Link>
          </li>
        </ul>
        <div className="signin">
          <Link href="/" onClick={handleTranslation} className="translate">
            <strong>{t("translate")}</strong>
          </Link>
          <button
            onClick={handleSignOut}
            style={{ backgroundColor: "rgba(17, 0, 35, 0.912)" }}
            className="icon"
          >
            <img src="/signin.png" alt="signout" />
          </button>
          <div className="message">Sign out</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
