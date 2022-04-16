import { useState } from "react";
import { Form, Grid } from "semantic-ui-react";
import Layout from "../components/Layout";
import { postDeal } from "../utils/dealApi";

// TODO: написать форму которая создаёт сделку любого из типов или PrivateDeal, или PublicDeal.
// TODO: Чтобы получить хэш и записать в БД текст стедлки надо отправить пост запрос на https://simple-hash-server-mcs.herokuapp.com/
// TODO: В теле запроса пердать объект {title: "Заоголовок", text: "Текст сделки"}. При успехе в ответе с сервера вёрнйтся хэш
// TODO: Получить текст по хэшу можно гетзапросом на https://simple-hash-server-mcs.herokuapp.com/hashs/<хэш>
// TODO: Посмотреть все записи в бд можно гетзапросом на https://simple-hash-server-mcs.herokuapp.com/

const initialFormState = {
  title: null,
  text: null,
  dealType: null,
};

const CreateDeal = () => {
  const [form, setForm] = useState(initialFormState);
  const { title, text, dealType } = form;

  const handleFormChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    await postDeal(form);
  };

  return (
    <Layout>
      <h1>Create deal</h1>
      <Form onSubmit={handleFormSubmit}>
        <Grid verticalAlign="middle">
          <Grid.Column width={8}>
            <Form.Input
              placeholder="Заголовок"
              label="Заголовок"
              name="title"
              onChange={handleFormChange}
            />
            <Form.TextArea
              placeholder="Текст сделки"
              label="Текст сделки"
              name="text"
              onChange={handleFormChange}
            />

            <Form.Radio
              label="Приватная сделка"
              name="dealType"
              value="privateDeal"
              checked={form.dealType === "privateDeal"}
              onChange={handleFormChange}
            />
            <Form.Radio
              label="Публичная сделка"
              name="dealType"
              value="publicDeal"
              checked={form.dealType === "publicDeal"}
              onChange={handleFormChange}
            />
            <Form.Button
              disabled={!(title && text && dealType)}
              content="Создать сделку"
            />
          </Grid.Column>
        </Grid>
      </Form>
    </Layout>
  );
};

export default CreateDeal;
