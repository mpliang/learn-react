import React from "react";
import Form from "./Form"

export default React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getPosts();
    // setInterval(this.getPosts, 2000);
  },
  addNewPost(newPost) {
    let currentPosts = this.state.data;
    currentPosts.unshift(newPost);
    this.setState({data: currentPosts});
  },
  getPosts: function() {
    var PostObject = Parse.Object.extend('PostObject');
    var query = new Parse.Query(PostObject);
    query.find({
      success: (object) => {
        // object is an instance of Parse.Object.
        var data = object.map(function(post){
          return post.attributes;
        });

        var displayData = data.map(function(post, index) {
          return (
            <div key={index}>
              <h3>{post.title}</h3>
              <time>{post.date}</time>
              <p>{post.body.slice(0,30)}...read more</p>
            </div>
          )
        });
        this.setState({data: displayData});
      },

      error: function(object, error) {
        // error is an instance of Parse.Error.
        console.log(error);
      }
    });
    // $.ajax({
    //       // url: '/server/data.json',
    //       dataType: 'json',
    //       success: function(data) {
    //         console.log(data);
    //         var displayData = data.posts.map(function(post, index) {
    //           return (
    //             <div key={index}>
    //               <h3>{post.title}</h3>
    //               <p>{post.date}</p>
    //               <p>{post.body}</p>
    //              </div>
    //           )
    //         });
    //         console.log(displayData);
    //         this.setState({data: displayData});
    //       }.bind(this),
    //       error: function(err) {
    //         console.log(err);
    //       }
    //     });
  },
  render() {
    var data = this.state.data;
    return (
      <div>
        {data}
        <Form post={this.addNewPost}/>
      </div>);
  }
})
