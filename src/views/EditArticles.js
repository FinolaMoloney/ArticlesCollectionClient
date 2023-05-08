import {useState, useEffect} from 'react';
import axios from 'axios';
import '../components/Create.css'

function EditArticles({ id }) {
    const [editMsg, setEditMsg] = useState([]);
    const [articleId, setArticleID] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [published, setPublished] = useState(false);

    useEffect(() =>
    async function () {
        var response = await axios.get("http://54.217.235.42:4000/articles");
        const article = response.data;
        setArticleID(article.id);
        setTitle(article.title);
        setBody(article.body);
        setPublished(article.published);
    }, [])

   function handleId(e) {
    e.preventDefault();
    setArticleID(e.target.value)
    }
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
        try {
        var response = await axios.put(`http://54.217.235.42:4000/articles/${id}`,
        {title: title, body: body, published: published},
            {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json' 
                }, })
        var data = response.data
        setEditMsg("You have successfully updated this article")
    } catch(e) {
        setEditMsg(e.response.error)
    }
    }
    return (
        <div>
            <div className="header">
                <h4>Edit the Article</h4>
            </div>
            <div className="container-fluid">
            <div className="contact-form">
                <h6>Enter the new details for the article below</h6>
                <form className="contactFormBorder">
                    <input value={title} type="text" className="form-control" placeholder="Title" onChange={handleTitle}/><br/>
                    <textarea value={body} type="text" className="form-control" placeholder="Body" rows="5" cols="40" onChange={handleBody}/><br />   
                    <div className="form-check">
                    <input value={published} type="checkbox" className="form-check-input" onChange={handlePublished}/>
                    <label className="form-check-label">Published</label><br /><br/>
                    </div>
                    <button className="btn btn-outline-secondary btn-sm" onClick={handleSubmit}>Edit</button><a href="/" className="btn btn-outline-secondary btn-sm">Back to Articles</a>
                    <p>{editMsg}</p>
                </form>
            </div>
        </div>
    </div>
    )
}

export default EditArticles;