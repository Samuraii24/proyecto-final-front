import Head from "next/head";

export function Seo(props) {
  const {
    title = "Gaming",
    description = "Compra las últimas novedades en Gaming",
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}
