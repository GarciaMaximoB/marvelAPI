import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import { ComicsUseCases } from "@/useCases/comicsUseCases";
import { GlobalStateService } from "@/services/globalStateService";
import { debounce } from "@/utils/debounce";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => onSearch(searchQuery), 300),
    [onSearch]
  );

  useEffect(() => {
    if (query === "") {
      onSearch("");
    } else {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Encuentra tu comic favorito..."
        className={styles.input}
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.button}>
        <Image src="/search.svg" alt="search icon" width={35} height={35} />
      </button>
    </form>
  );
}
