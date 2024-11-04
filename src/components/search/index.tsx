import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import { GlobalStateService } from "@/services/globalStateService";
import { debounce } from "@/utils/debounce";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [localQuery, setLocalQuery] = useState(GlobalStateService.getQuery());

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
      GlobalStateService.setQuery(searchQuery);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    if (localQuery === "") {
      onSearch("");
      GlobalStateService.setQuery("");
    } else {
      debouncedSearch(localQuery);
    }
  }, [localQuery, debouncedSearch, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Encuentra tu comic favorito..."
        className={styles.input}
        value={localQuery}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.button}>
        <Image src="/search.svg" alt="search icon" width={35} height={35} />
      </button>
    </form>
  );
}
