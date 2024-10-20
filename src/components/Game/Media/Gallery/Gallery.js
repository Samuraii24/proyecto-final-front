import styles from "./Gallery.module.scss";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { FullModalScreen } from "@/components/Shared";
import { useState } from "react";
import Slider from "react-slick";

const SERVER_HOST = "http://localhost:1337";

const buildImageUrl = (url) => {
  return url.startsWith("/") ? `${SERVER_HOST}${url}` : url;
};

export function Gallery(props) {
  const { screenshots } = props;
  const [show, setShow] = useState(false);

  const screenShotsClone = [...screenshots];
  const principalImage = screenShotsClone.shift();
  const onOpenClose = () => setShow((prevState) => !prevState);

  const principalImageUrl = buildImageUrl(principalImage.attributes.url);

  const settings = {
    infinite: true,
    slidersToShow: 1,
    slidersToScroll: 1,
    customPaging: function (index) {
      return <Image src={screenshots[index].attributes.url} />;
    },
  };

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.principal}>
          <Image src={principalImageUrl} onClick={onOpenClose} />
        </div>
        <div className={styles.grid}>
          {map(screenShotsClone, (screenshot) => {
            const screenshotUrl = buildImageUrl(screenshot.attributes.url);
            return (
              <div key={screenshot.id}>
                <Image src={screenshotUrl} onClick={onOpenClose} />
              </div>
            );
          })}
        </div>
      </div>
      <FullModalScreen show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            {map(screenshots, (screenshot) => {
              const screenshotUrl = buildImageUrl(screenshot.attributes.url);
              return (
                <div key={screenshot.id}>
                  <Image src={screenshotUrl} />
                </div>
              );
            })}
          </Slider>
        </div>
      </FullModalScreen>
    </>
  );
}
