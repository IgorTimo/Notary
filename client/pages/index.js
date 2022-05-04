import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import SearchComponent from "../components/SearchComponent";
import { Card, Grid, Header } from "semantic-ui-react";
import { useState } from "react";
import { getDeals } from "../utils/dealApi";

//TODO: здесь должен быть код который принимает из пропсов массив объектов list типа {owner : "", gistId: "", gistHash: "" } возвращает список нажимаемых карточек.
//TODO: По нажатию на карточку в консоль должен выводиться gistId
// Для теста уже закинул массив в пропсы

const style = {
  h3: {
    margin: "2em 0",
  },
};

const Index = (props) => {
  const [list, setList] = useState(props.list);
  const searchResultCallback = (foundedContract) =>
    setList(
      foundedContract
        ? [props.list.find((li) => li.title === foundedContract.title)]
        : props.list
    );

  return (
    <Layout>
      <Grid verticalAlign="middle">
        <Grid.Column width={8}>
          <Header as="h3" textAlign="center" style={style.h3}>
            Контракты:
          </Header>
        </Grid.Column>

        <Grid.Column width={8} textAlign="right">
          <SearchComponent
            list={list}
            searchResultCallback={searchResultCallback}
          />
        </Grid.Column>
      </Grid>

      <Card.Group itemsPerRow="2">
        <CardItem list={list} />
      </Card.Group>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const list = await getDeals();

  return { 
    list: list.hashes
  };
};

export default Index;
