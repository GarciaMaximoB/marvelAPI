import { useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { GlobalStateService } from "@/services/globalStateService";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(query)
    onSearch(query);
  };

  return (
    <form className={styles.form} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Encuentra tu comic favorito..."
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        <Image src="/search.svg" alt="search icon" width={35} height={35} />
      </button>
    </form>
  );
}
