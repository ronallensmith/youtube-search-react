import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
const API_KEY = 'AIzaSyAePyVas3nTBjybHU8Uj0iKLvo5vXQCXd8';

class App extends Component {
  constructor(props) {
    super(props);
    
   this.state = {
     videos: [],
     selectedVideo: null
   };
   
   this.videoSearch('node.js');
  }
  
  videoSearch (term) {
    YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
  
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    )
  }
}

ReactDom.render(
  <App />, document.querySelector('.container')
);