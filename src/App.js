import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
//js perso
import { sampleText } from './sampleText';
// marked.js
import marked from 'marked';


class App extends React.Component {

  state = {
    text: sampleText
  };

  componentWillMount() {
    const localStorageText = localStorage.getItem('text');
    
    if(localStorageText) {
      this.setState({ text: localStorageText });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('text', nextState.text);
  };

  editText = (event) => {
    const text = event.target.value;
    this.setState({ text });
  };


  renderText = (text) => {
    const renderText = marked(text, {sanitize: true});
    return { __html: renderText };
  };

  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea 
              className="form-control" 
              rows="35" 
              value={this.state.text} 
              onChange={(e) => this.editText(e)}
            >

            </textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
