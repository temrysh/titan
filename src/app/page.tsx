"use client";

import { useContents } from "@/stores/use-contents";
import List from "@/components/list";
import styles from "./page.module.css";

export default function Home() {
  const { contents, isLoading, error } = useContents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <List items={contents} />
      </main>
    </div>
  );
}
