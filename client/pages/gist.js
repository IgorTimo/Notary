import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import getGistInfoById from "../utils/gitApi/getGistInfoById.js";
import { Button, Message, List, Form } from "semantic-ui-react";

const Gist = (props) => {
  const [gistid, setGistid] = useState("");
  const [creator, setCreator] = useState([]);
  const [text, setText] = useState([]);
  const [lastupdate, setLastupdate] = useState([]);
  const [visible, setVisible] = useState(false);

  function handleOnSubmintForm(e) {
    let userInfo = getGistInfoById(gistid);
    userInfo.then((result) => {
      setCreator(result.creator);
      setText(result.text);
      setLastupdate(result.lastUpdate);
    }).catch(error => console.error(error.message));
    setVisible(true);
    e.preventDefault();
  }

  const ShowInfo = () => (
    <List>
      <List.Item>
        <List.Content>
          <List.Header>Login</List.Header>
          <List.Description>{creator}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Text</List.Header>
          <List.Description>{text}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Last Update</List.Header>
          <List.Description>{lastupdate}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );

  return (
    <Layout>
      <Form onSubmit={handleOnSubmintForm}>
        <Form.Field>
          <label>GistID</label>
          <input
            placeholder="Your GistID"
            value={gistid}
            onChange={(e) => setGistid(e.target.value)}
          />
        </Form.Field>

        <Button type="submit">Submit</Button>
      </Form>
      {visible && <ShowInfo />}
    </Layout>
  );
};

export default Gist;
