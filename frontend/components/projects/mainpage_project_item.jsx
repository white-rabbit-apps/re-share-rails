import React from 'react';
import { Link } from 'react-router-dom';

class ProjectMainpageItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.cancelLike = this.cancelLike.bind(this);
  }

  handleLike() {
    if (this.props.currentUser) {
      this.props.createLikeIndex(this.props.project.id)
    } else {
      window.alert("Please login  to Like the project")
      // Alert.info('Test message 2', {
      //       position: 'bottom-left',
      //       effect: 'bouncyflip',
      //       timeout: 'none'
      // });
    }
  }

  cancelLike() {
    this.props.deleteLikeIndex(this.props.project.likeId[0])
  }

  render() {
    return (
      <li className="ProjectItemView">
        {<Link to={`/projects/${this.props.project.id}`}>
        <img className="mainpage-index-img" src={this.props.project.image_url}/>
        <div>
          <h4>{this.props.project.title}</h4>
          <h6>BY: {this.props.project.username}</h6>
        </div>
        </Link>}
        {this.props.currentUser ? (this.props.project.likeId.length === 0 ?
          (<div className="featured_like"><img src="https://s3-us-west-1.amazonaws.com/appstarter-chyna/like.png" className="likeButtonProjectPage" onClick={() => this.handleLike()}/></div>)
          :
          (<div className="featured_like"><img src="https://s3-us-west-1.amazonaws.com/appstarter-chyna/liked.png" className="dislikeButtonProjectPage" onClick={() => this.cancelLike()}/></div>)
        ) : (null)}
      </li>
    )
  }
};



export default ProjectMainpageItem;
