// здесь должен быть лк пользователя 
// адрес должен быть динамическим, так как до рендера страницы нам нужно знать для кого мы его ренедрим
// поэтому просто забираем у метамаска адрес и отображаем лк для него
// может стоит давать возможность посмотреть и других юзеров
// здесь должно быть две вкладки: создатель и подписант

import Layout from "../../components/Layout";

const User = () => {
    return ( <Layout><h1>User</h1></Layout> );
}
 
export default User;