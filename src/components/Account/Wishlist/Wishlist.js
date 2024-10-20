import { useState, useEffect } from "react";
import { Wishlist as WishlistCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { NoResult } from "@/components/Shared";
import { size } from "lodash";
import { GridGames } from "./GridGames";
import { Grid } from "semantic-ui-react";

const wishlistCtrl = new WishlistCtrl();

export function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [reload, setReload] = useState(false);
  const { user } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrl.getAll(user.id);
        setWishlist(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  return size(wishlist) === 0 ? (
    <NoResult text="Añade tu próximo juego" />
  ) : (
    <GridGames wishlist={wishlist} onReload={onReload} />
  );
}
