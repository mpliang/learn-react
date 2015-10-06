import React from "react";

export default React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getPosts();
    // setInterval(this.getPosts, 2000);
  },
  getPosts: function() {
    $.ajax({
          url: 'http://localhost:8000',
          dataType: 'json',
          success: function(data) {
            console.log(data);
            var displayData = data.posts.map(function(post) {
              return (
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <p>{post.date}</p>
                 </div>
              )
            });
            console.log(displayData);
            this.setState({data: displayData});
          }.bind(this),
          error: function(err) {
            console.log(err);
          }.bind(this)
        });
  },
  render() {
    var data = this.state.data;

    return (
      <div>
        {data}
      </div>);
  }
})
