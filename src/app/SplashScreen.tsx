import { useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";
import styles from "./SplashScreen.module.css";
import nearFutureImage from "../../New Asset/near-future-v2.png";
import distantFutureImage from "../../New Asset/distant-future-v2.png";

interface VersionOption {
  id: string;
  path: string;
  title: string;
  image: string;
}

const VERSIONS: VersionOption[] = [
  {
    id: "near-future",
    path: "/near-future",
    title: "Near Future",
    image: nearFutureImage,
  },
  {
    id: "distant-future",
    path: "/distant-future",
    title: "Distant Future",
    image: distantFutureImage,
  },
];

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <main className={styles.home}>
      <header className={styles.heading}>
        <p className="font-centrale-sans-medium">Azurion</p>
        <h1 className="font-centrale-sans-book">IVUS Flexvision</h1>
      </header>

      <div className={styles.versions}>
        {VERSIONS.map((version) => (
          <button
            key={version.id}
            type="button"
            onClick={() => navigate(version.path)}
            className={`${styles.version} font-centrale-sans-medium`}
          >
            <img className={styles.image} src={version.image} alt="" />
            <span className={styles.caption}>
              <span className={styles.title}>{version.title}</span>
              <ArrowUpRight className={styles.arrow} size={36} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
