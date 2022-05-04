import { Container, Header } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { getDealByHash, getDeals } from "../../utils/dealApi";

const Deal = ({ deal }) => {
  const { document } = deal;

  return (
    <Layout>
      <Container text>
        <Header as="h2">{document.title}</Header>
        <p>{document.text}</p>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const deals = await getDeals();
  const paths = deals.hashes.map(({ hash }) => ({ params: { hash } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const deal = await getDealByHash(params.hash);

  return { props: { deal } };
}

export default Deal;
