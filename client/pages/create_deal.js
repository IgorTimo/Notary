import Layout from "../components/Layout";

// TODO: написать форму которая создаёт сделку любого из типов или PrivateDeal, или PublicDeal. 
// TODO: Чтобы получить хэш и записать в БД текст стедлки надо отправить пост запрос на https://simple-hash-server-mcs.herokuapp.com/ 
// TODO: В теле запроса пердать объект {title: "Заоголовок", text: "Текст сделки"}. При успехе в ответе с сервера вёрнйтся хэш
// TODO: Получить текст по хэшу можно гетзапросом на https://simple-hash-server-mcs.herokuapp.com/hashs/<хэш>
// TODO: Посмотреть все записи в бд можно гетзапросом на https://simple-hash-server-mcs.herokuapp.com/

const CreateDeal = () => {
    return ( <Layout><h1>Create deal</h1></Layout> );
}
 
export default CreateDeal;