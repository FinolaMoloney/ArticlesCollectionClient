import { useState, useEffect } from 'react';
import axios from 'axios';
import Articles from '../components/Articles'

function ShowArticles({ id }) {
    const [article, setArticle] = useState('');    
    const [deleteMsg, setDeleteMsg] = useState([]);
  
    useEffect(() => {
      async function fetchArticle() {
        const response = await axios.get(
          `http://127.0.0.1:4000/articles/${id}`,
          { headers: { Accept: "application/json" } }
        );
        setArticle(response.data)
      }
      fetchArticle();
    }, [id]);

    //Delete article 
        async function handleSubmit(e) {
            e.preventDefault();
            try {
            var response = await axios.delete(`http://localhost:4000/articles/${id}`,
               
                {
                    method: 'DELETE',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json' 
                    }, })
            var data = response.data
            setDeleteMsg("You have successfully deleted this article")
        } catch(e) {
            setDeleteMsg(e.response.error)
        } 
    }
    
      return (
        <div>
          <div className="header">
            <h4>Edit the Article</h4>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div class="card h-100">
                <div className="card-body">
                  <Articles title={article.title} body={article.body} published={article.published} />
                  <a href={`/edit/${article.id}`} className="btn btn-outline-secondary btn-sm">Edit this article</a>
                  <button className="btn btn-outline-secondary btn-sm" onClick={handleSubmit}>Delete</button>
                  <br/><p3>{deleteMsg}</p3>
                </div>
              </div>  
            </div>  
            <a href="/" className="btn btn-outline-secondary btn-sm">Back to Articles</a>
          </div>
        </div>
      );
    }

export default ShowArticles;