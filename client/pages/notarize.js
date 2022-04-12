import Layout from "../components/Layout";
import sha256 from "sha256"
import React, {useEffect, useState} from 'react'
import { Input } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Button, Form , Submit} from 'semantic-ui-react'
import axios from 'axios'


//TODO: Надо написать компонент, который может либо принимать файл либо текст, который загрузил польователь. 
//TODO: Хэшировать его и выводить хэш на экран. Пользоваться пакетом sha256, он уже импоритирован и работает

const Notarize = (props) => {
    const [doc, setDoc] = useState("")
    const [text,setText] =useState("")
    const [hash,setHash] = useState("")
    const [hashclick, stHashclick] = useState(false)
    const [hashclickf, stHashclickf] = useState(false)
    const [state, setState] = useState({selectedFile: null})
    const [hashclickfile, setHashclickfile] = useState("")

      // On file select (from the pop up) 
    function onFileChange(event) { 
        setState({selectedFile : event.target.files[0]}); 
    }; 
  
      // On file upload (click the upload button) 
    function onFileUpload() { 
        const formData = new FormData(); // Create an object of formData  
        formData.append("myFile",state.selectedFile, state.selectedFile.name); // Update the formData object 

        console.log(state.selectedFile, state.selectedFile.name, state.selectedFile.type ); // Details of the uploaded file
  
        // Request made to the backend api 
        // Send formData object 
        axios.post("notarize", formData)
        .catch(error => console.error(error)); 

        setHashclickfile(sha256(formData))
    }; 
  
    function handleChange(event) {
        setDoc(event.target.value)
    }

    useEffect(() => {
        console.log(doc)
    },[doc],[state])

    function handleTextChange(event) {
        setText(event.target.value)
        console.log(text)
        setHash(sha256(event.target.value))
    }
    function hadleHashClick() {
        stHashclick(!hashclick)
    }

    function hadleHashClickf() {
        stHashclickf(!hashclickf)
    }


    return ( <Layout>
        
        <Form type="submit" onChange={handleChange} >
            <Form.Group grouped>
            <label>Выберите что вы хотите загрузить</label>
            <Form.Field
                label='Файловый документ'
                control='input'
                type='radio'
                name='htmlRadios'
                value = "filedoc"
            />
            <Form.Field
                label='Текстовый документ'
                control='input'
                type='radio'
                name='htmlRadios'
                value= "textdoc"
            />
            </Form.Group>            
        </Form>
        {doc === "textdoc" && 
            (<Form unstackable>
                <Form.Group widths={2}>
                    <Form.Input label='Введите текст документа' placeholder='Текст документа' value={text} onChange={handleTextChange} />
                </Form.Group>
                {/*<Form.Checkbox label='Я согласен с положениями' />*/}
                <p></p>
                <Button type='submit' onClick={hadleHashClick}  >Захешировать</Button>
                {hashclick && <p>{hash}</p>}           
            </Form>)
        }
        {doc === "filedoc" &&
            (<Form unstackable>
                <Header size = "tiny">Загрузите файл документа</Header>
                <Input type="file" onChange={onFileChange} />
                <Button onClick={onFileUpload}>Загрузить</Button> 
                <p></p>
                {(state.selectedFile) ? (<p>Файл загружен</p>) : (
                <p>Выберите файл перед загрузкой</p>)}
                <Button type='submit' onClick={hadleHashClickf} >Захешировать</Button>
                {hashclickf && <p>{hashclickfile}</p>} 
            </Form>   
             )
        }
    </Layout>);
}
export default Notarize;