import React, {useEffect, useState} from 'react';
import './style.scss';
import {getTagService} from "../../services/tagService";
import {Link} from "react-router-dom";

function HomeContainer() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getTagService().then((res) => {
      console.log(`response from getTags ${JSON.stringify(res)}`);
      setTags(res.tags.map(e => e.name));
    }).catch()
  }, []);

  return (
    <div className={"home-container"}>
      <div className={"title"}>
        Dive deeper on topics that matter to you.
      </div>
      <div className="sub-title">
        Select what you're into. We'll help you find great things to read.
      </div>
      <ul className="tags-container">
        {tags.map(tag => (
          <Link to={`/tag/${tag}`} className="tag">
            <span className={"hash-circle"}>#</span>{tag.charAt(0).toUpperCase()+tag.slice(1)}
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default HomeContainer;