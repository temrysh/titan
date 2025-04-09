import { memo } from "react";
import Image from "next/image";
import { useVisibility } from "../../hooks/use-visibility";
import styles from "./item.module.css";

interface ItemProps {
  image: string;
  title: string;
  isFocused: boolean;
}

const Item = memo(({ image, title, isFocused }: ItemProps) => {
  const { ref, isVisible } = useVisibility();

  return (
    <div className={styles.item} data-focus={isFocused} ref={ref}>
      <Image
        src={image}
        alt={title}
        width={300}
        height={420}
        className={styles.image}
        priority={isVisible}
        loading={isVisible ? "eager" : "lazy"}
      />
      <div className={styles.title}>{title}</div>
    </div>
  );
});

Item.displayName = "Item";

export default Item;
