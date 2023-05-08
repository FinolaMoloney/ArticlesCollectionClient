import { useState } from 'react';
import axios from 'axios';

function CreateArticles() {
    const [newArticle, setNewArticle] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [published, setPublished] = useState(false);

    function handleTitle(e) {
        e.preventDefault();
        setTitle(e.target.value)
    }
    function handleBody(e) {
        e.preventDefault();
        setBody(e.target.value)
    }
    function handlePublished(e) {
        e.preventDefault();
        setPublished(e.target.checked)
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        if (title===''||body==='') {
            setErrorMsg("Please fill in the title and body of the Article before clicking Create.")
        }else{
        try {
        var response = await axios.post("http:/18.203.81.62:4000/articles",
            {title: title, body: body, published: published},
            {headers: {Accept: 'application/json'}}
        )
        var data = response.data
        setNewArticle("You have successfully created a new Article")
    } catch(e) {
        setNewArticle(e.response.error)
    } 
}
    }
    return (
        <div>
            <div className="header">
                <h4>Create an Article</h4>
            </div>
            <div className="container-fluid">
                <div className="contact-form">
                    <h6>Enter the details of the article below</h6>
                    <form className="contactFormBorder">
                        <input value={title} type="text" className="form-control" placeholder="Title" onChange={handleTitle}/><br/>
                        <textarea value={body} type="text" className="form-control" placeholder="Body" rows="5" cols="40" onChange={handleBody}/><br />   
                        <div className="form-check">
                        <input value={published} type="checkbox" className="form-check-input" onChange={handlePublished}/>
                        <label className="form-check-label">Published</label><br /><br/>
                        </div>
                        <button className="btn btn-outline-secondary btn-sm" onClick={handleSubmit}>Create</button><a href="/" className="btn btn-outline-secondary btn-sm">Back to Articles</a>
                        <p>{newArticle}</p>
                        <p>{errorMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateArticles;