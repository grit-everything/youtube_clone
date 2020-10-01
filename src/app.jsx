import React, { Component } from 'react';
import './app.css';
import { Grid } from '@material-ui/core';

import { SearchBar, VideoDetail, VideoList } from './components';
import youtube from './api/youtube';

// import youtube from './api/youtube';

class App extends Component {
  state = {
    videos: [],
    selectedVideo: null,
  };
  componentDidMount() {
    this.handleSubmit('motivation');
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 5,
        key: 'AIzaSyDdInymZMLdh4trTf5tRILg_br471ePaFQ',
        q: searchTerm,
      },
    });
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    // console.log(response.data.items.video.id)
    console.log(response.data.items[0].id.videoId);
  };

  render() {
    const { selectedVideo, videos } = this.state;
    return (
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
