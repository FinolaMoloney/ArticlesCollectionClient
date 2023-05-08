import {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Articles from './Articles'
import '../components/ArticlesCollection.css'
function ArticlesCollection() {
    const [articlesCollection, setArticlesCollection] = useState([]);
    const [publishedFilter, setPublishedFilter] = useState(null);
    const newFilteredArticles = filteredArticles();

    useEffect(() =>
    async function () {
        var response = await axios.get("http://18.203.81.62:4000/articles",
        {headers: {Accept: "application/json"} })
        setArticlesCollection(response.data)
        var articleId = response.data.id
    }, [])

    function handlePublishedFilterChange(e) {
        e.preventDefault();
        setPublishedFilter(e.target.value === 'null' ? null : e.target.value);
    }

    function filteredArticles() {
        if (publishedFilter === null) {
        return articlesCollection;
        } else {
            return articlesCollection.filter(article => article.published === (publishedFilter === 'true'));
        }
    }

    return (
        <div>
            <div className="header">
                <h4>Find the latest News here</h4>
            </div>
            <div className="container-fluid">
                <div class="row sub-header">
                    <div className="col-sm-10">
                        <select value={publishedFilter} className ="btn btn-outline-secondary btn-sm" type="dropdown" onChange={handlePublishedFilterChange}> 
                            <option value="null">Filter by Published</option>
                            <option value="null">All</option>
                            <option value="true">Published</option>
                            <option value="false">Unpublished</option>
                        </select>
                    </div>
                    <a href="/create" className="btn btn-outline-secondary btn-sm col-sm-2">Click here to add a new article</a><br />
                </div>
                <div className="row">
                    {newFilteredArticles.map(function(i, index) {
                        return(
                            <div className="col-sm-4 mb-3 mb-sm-5">
                            <div class="card h-100">
                                <div className="card-body">
                                    <div key={index}>
                                        <Articles title={i.title} body={i.body} published={i.published} />
                                    </div>
                                </div> 
                                <div className="card-footer"><a href={`/show/${i.id}`} className="btn btn-outline-secondary btn-sm">Show this article</a></div>
                                </div>  
                            </div>
                        )
                    })   
                }
            </div>
            </div>
        </div>
    )
}

export default ArticlesCollection;