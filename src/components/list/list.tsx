"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
  memo,
} from "react";
import Item from "@/components/item";
import styles from "./list.module.css";

const NAV_KEYS = ["ArrowRight", "ArrowLeft"];
const ITEM_WIDTH = 340; // width + gap

interface Item {
  id: number;
  title: string;
  images: {
    artwork_portrait: string;
  };
}

interface ListProps {
  items: Item[];
}

const List = memo(({ items }: ListProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!NAV_KEYS.includes(e.key)) return;

      const step = e.key === "ArrowRight" ? 1 : -1;

      startTransition(() => {
        setFocusedIndex((prev) =>
          Math.max(0, Math.min(prev + step, items.length - 1))
        );
      });
    },
    [items.length, startTransition]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const transform = useMemo(
    () => `translate3d(-${focusedIndex * ITEM_WIDTH}px, 0, 0)`,
    [focusedIndex]
  );

  const listItems = useMemo(
    () =>
      items.map((items, index) => (
        <Item
          key={items.id}
          image={items.images.artwork_portrait}
          title={items.title}
          isFocused={index === focusedIndex}
        />
      )),
    [items, focusedIndex]
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.list}
        style={{ transform }}
        data-testid="list"
        data-pending={isPending}
      >
        {listItems}
      </div>
    </div>
  );
});

List.displayName = "List";

export default List;
