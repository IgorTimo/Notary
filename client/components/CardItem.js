import { Card } from "semantic-ui-react";

const CardItem = ({ list }) => {
  return list.map(({ title, hash }) => (
    <Card
      key={hash}
      href={`deal/${hash}`}
      header={title}
      description={`Hash: ${hash}`}
    />
  ));
};

export default CardItem;
