import React, {useEffect, useReducer, useRef} from 'react';
import {getArticleById} from "../../services/article";
import {articleReducer} from "../../reducers";
import {SET_ARTICLE} from "../../actions";
import "./style.scss";

function ArticleContainer(props) {
  const contentRef = useRef(null);
  const [articleStore, dispatch] = useReducer(articleReducer, {});
  useEffect(() => {
    getArticleById(props.match.params.id).then((res) => {
      // contentRef.current.innerHTML = res[0].article;
      dispatch({
        type: SET_ARTICLE,
        payload: {
          ...res[0],
          article_id: props.match.params.id,
        }
      });
      contentRef.current.innerHTML = articleStore.article;
    })
  }, []);

  useEffect(() => {
    contentRef.current.innerHTML = articleStore.article;
  }, [articleStore]);

  return (
    <div className="view-article-container">
      <div className="title">{articleStore.title || 'Loading...'}</div>
      {articleStore.name && <div className="author">Post Created By {articleStore.name}</div>}
      <div className="article" ref={contentRef}/>
    </div>
  )
}

export default ArticleContainer;