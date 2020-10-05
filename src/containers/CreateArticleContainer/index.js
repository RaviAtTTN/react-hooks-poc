import React, {useContext, useEffect, useState} from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import {getTagService} from "../../services/tagService";
import {postArticleService} from "../../services/article";
import {UserContext} from "../../App";
import {ROUTE} from "../../constants";
import "./style.scss";

function CreateArticleContainer(props) {

  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [tags, setTags] = useState([]);
  // const [tagSuggestions, setTagSuggestions] = useState([]);
  const userData = useContext(UserContext);

  const onTagsChange = (tags) => {
    setTags(tags);
  };

  useEffect(() => {
    if(userData.userStore && userData.userStore.name){
      getTagService().then((res) => {
        // setTagSuggestions(res.tags.map(e => e.name));
      }).catch()
    } else {
      props.history.push(ROUTE.AUTH);
    }
  }, []);

  const submitArticle = () => {
    if(articleTitle && articleContent && (tags && tags.length)) {
      postArticleService({
        title: articleTitle,
        article: articleContent,
        tags
      }).then((res) => {
        props.history.push('/');
      })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="write-art-container">
      <div className="card custom-card">
        <label htmlFor={'title'}>Title</label>
        <input
          name="title"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />
        <label htmlFor={'tags'}>Tags</label>
        <TagsInput
          value={tags}
          onChange={onTagsChange}
          onlyUnique={true}
        />
        <label htmlFor={'article'}>Article</label>
        <CKEditor
          editor={ClassicEditor}
          data={articleContent}
          onChange={(event, editor) => {
            const data = editor.getData();
            setArticleContent(data);
          }}
        />
        <button onClick={submitArticle} className={"submit-btn"}>Submit</button>
      </div>
    </div>
  )
}

export default CreateArticleContainer;