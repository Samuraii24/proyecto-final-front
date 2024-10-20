import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridGames,
  Separator,
  NoResult,
  Pagination,
} from "@/components/Shared";

export default function platform(props) {
  //Aquí dejamos el default por que es una página
  const { games, platform, pagination } = props;
  const hasProducts = size(games) > 0;

  return (
    <>
      <BasicLayout relative>
        <Container>
          <Separator height={50} />
          <h2>{platform.attributes.title}</h2>

          {hasProducts ? (
            <>
              <GridGames games={games} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La categoria ${platform.attributes.title} aún no tiene ningún juego!!`}
            />
          )}
          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
