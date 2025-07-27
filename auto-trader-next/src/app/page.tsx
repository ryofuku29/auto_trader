import styles from "./page.module.css";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        {/* <Image
          src="/images/top-page-bg.jpg"
          alt="背景画像"
          fill
          className="z-n1 object-fit-cover bg-body-secondary"
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 z-n2"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        /> */}
        <div className="z-1">
          <h1 className="text-center my-6">株の自動売買ツール</h1>
          <p>
            説明です説明です説明です説明です説明です説明です説明です説明です説明です
            説明です 説明です 説明です 説明です 説明です 説明です 説明です
            説明です 説明です 説明です 説明です 説明です 説明です 説明です
            説明です 説明です 説明です 説明です 説明です 説明です 説明です
            説明です 説明です 説明です 説明です 説明です 説明です
          </p>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
