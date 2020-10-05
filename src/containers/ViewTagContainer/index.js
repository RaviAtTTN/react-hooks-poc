import React, {useEffect, useState} from 'react';
import './style.scss';
import {getArticlesByTag} from "../../services/tagService";
import {Link} from "react-router-dom";

function ViewTagContainer(props) {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const tag = props.match.params.tag;
    getArticlesByTag(tag).then((res) => {
      setArticles(res.articles);
    }).catch((err) => {
      console.log(err);
      props.history.push('/');
    })
  }, []);
  return (
    <div className={"view-tag-container"}>
      {
        articles && articles.map((article) => (
          <div className="card custom-card">
            <div className="title">{article.title}</div>
            <Link className="btn" to={`/article/${article.article_id}`}>View Article</Link>
          </div>
        ))
      }
    </div>
  )
}

export default ViewTagContainer;