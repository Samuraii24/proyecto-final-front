import { BasicLayout } from "@/layouts/BasicLayout";
import { Home } from "@/components/Home";
import { Separator, BarTrust, BannerAd, Seo } from "@/components/Shared";
import { Container } from "semantic-ui-react";

const platformsId = {
  playstation: 1,
  xbox: 2,
  nintendo: 3,
  pc: 4,
};

export default function HomePage() {
  return (
    <>
      <Seo />

      <BasicLayout>
        <Home.BannerLastGamePublished />

        <Separator height={100} />

        <Container>
          <Home.LatestGames title="Últimos lanzamientos" />
        </Container>
        <Separator height={100} />

        <BarTrust />
        <Separator height={100} />
        <Container>
          <Home.LatestGames
            title="PlayStation"
            limit={3}
            platformId={platformsId.playstation}
          />
        </Container>
        <Separator height={100} />
        <BannerAd
          title="Registrate y consigue los mejores juegos"
          subtitle="Sé el primero en jugar a los últimos lanzamientos"
          btnTitle="Entrar ahora"
          btnLink="/account"
          image="/images/Ban.jpg"
        />
        <Separator height={50} />
        <Container>
          <Home.LatestGames
            title="Xbox"
            limit={3}
            platformId={platformsId.xbox}
          />
        </Container>
        <Separator height={100} />
      </BasicLayout>
    </>
  );
}
